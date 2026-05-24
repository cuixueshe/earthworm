import { exec as childProcessExec } from "child_process";
import path from "path";
import { chdir } from "process";

import archiver from "archiver";
import fs from "fs-extra";
import inquirer from "inquirer";
import semver from "semver";

// Generic function to execute commands
function executeCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log(`Executing command: ${command}`);
    console.log("Current directory:", process.cwd());
    childProcessExec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.log(`${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      resolve(stdout);
    });
  });
}

// Function to upload to server
function uploadToServer(filePath: string, serverPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`Uploading ${filePath} to ${serverPath}`);
    const uploadCommand = `scp ${filePath} earthworm-server:${serverPath}`;
    executeCommand(uploadCommand)
      .then(() => {
        console.log(`File successfully uploaded to server`);
        resolve();
      })
      .catch((error) => {
        console.error(`Upload failed: ${error.message}`);
        reject(error);
      });
  });
}

// Function to unzip files on server
function unzipOnServer(filePath: string, serverPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`Unzipping ${filePath} to ${serverPath} on server`);
    const unzipCommand = `ssh earthworm-server "cd ${serverPath} && unzip -o ${path.basename(filePath)}"`;
    executeCommand(unzipCommand)
      .then(() => {
        console.log(`File successfully unzipped on server`);
        resolve();
      })
      .catch((error) => {
        console.error(`Unzip failed: ${error.message}`);
        reject(error);
      });
  });
}

async function buildAndPackage(
  type: "client" | "server" | "game-data-sdk" | "schema" | "all",
): Promise<void> {
  if (type === "client" || type === "all") {
    await buildClient();
  }
  if (type === "server" || type === "all") {
    await buildServer();
  }

  if (type === "game-data-sdk" || type === "all") {
    await buildGameDataSDK();
  }

  if (type === "schema" || type === "all") {
    await buildSchema();
  }
}

async function askForGitHubCommit(version: string, packageName: string): Promise<void> {
  const { shouldCommit } = await inquirer.prompt<{ shouldCommit: boolean }>([
    { type: "confirm", name: "shouldCommit", message: "Commit to GitHub?" },
  ]);

  if (shouldCommit) {
    try {
      const commitMessage = `release(${packageName}): v${version}`;
      await executeCommand(`git add .`);
      await executeCommand(`git commit -m "${commitMessage}"`);
      console.log(`Commit created: ${commitMessage}`);

      await executeCommand(`git push origin main`);
      console.log("Successfully pushed to GitHub");
    } catch (error) {
      console.error("Error during GitHub operation:", error);
    }
  }
}

async function buildClient(): Promise<void> {
  console.log("Building Client...");
  await executeCommand("npm run build:client");

  const clientPackageJson = await fs.readJson(
    path.resolve(__dirname, "../apps/client/package.json"),
  );
  let version = clientPackageJson.version;

  const outputPath = path.resolve(__dirname, "../apps/client/.output/public");
  const getZipFileName = (v: string) => path.resolve(`client-v${v}.zip`);
  let zipFileName = getZipFileName(version);

  await createZip({
    type: "client",
    source: outputPath,
    output: zipFileName,
    includeBaseFolder: false,
  });

  const { shouldUpgradeVersion } = await inquirer.prompt<{ shouldUpgradeVersion: boolean }>([
    {
      type: "confirm",
      name: "shouldUpgradeVersion",
      message: "Upgrade version?",
    },
  ]);

  if (shouldUpgradeVersion) {
    const newVersion = semver.inc(version, "patch");
    if (newVersion) {
      version = newVersion;
      clientPackageJson.version = version;
      await fs.writeJson("apps/client/package.json", clientPackageJson, { spaces: 2 });
      const newZipFileName = getZipFileName(version);
      await fs.rename(zipFileName, newZipFileName);
      zipFileName = newZipFileName;
    }
  }

  const { shouldUpload } = await inquirer.prompt<{ shouldUpload: boolean }>([
    { type: "confirm", name: "shouldUpload", message: "Upload to server?" },
  ]);

  if (shouldUpload) {
    const serverPath = process.env.CLIENT_SERVER_PATH;
    if (!serverPath) {
      console.error("Error: CLIENT_SERVER_PATH environment variable is not set");
      return;
    }

    if (await fs.pathExists(zipFileName)) {
      try {
        await uploadToServer(zipFileName, serverPath);
        await unzipOnServer(zipFileName, serverPath);
        // Delete local zip after successful server-side extraction
        await fs.remove(zipFileName);
        console.log(`Deleted local zip: ${zipFileName}`);
      } catch (error) {
        console.error("Error during upload or extraction:", error);
      }
    } else {
      console.log(`Warning: Zip file not found ${zipFileName}`);
    }
  }

  await askForGitHubCommit(version, "client");
}

async function buildServer(): Promise<void> {
  console.log("Building Api...");
  await executeCommand("npm run build:server");

  const serverPackageJson = await fs.readJson(path.resolve(__dirname, "../apps/api/package.json"));
  let version = serverPackageJson.version;

  const getZipFileName = (v: string) => path.resolve(`server-v${v}.zip`);
  let zipFileName = getZipFileName(version);

  const filesToZip = [
    path.resolve(__dirname, "../apps/api/dist"),
    path.resolve(__dirname, "../apps/api/.env.prod"),
    path.resolve(__dirname, "../apps/api/package.json"),
    path.resolve(__dirname, "../apps/api/ecosystem.config.js"),
    // path.resolve(__dirname, "../apps/api/package-lock.yaml"),
  ];
  await createZip({
    type: "server",
    source: filesToZip,
    output: zipFileName,
    includeBaseFolder: false,
  });

  const { shouldUpgradeVersion } = await inquirer.prompt<{ shouldUpgradeVersion: boolean }>([
    {
      type: "confirm",
      name: "shouldUpgradeVersion",
      message: "Upgrade version?",
    },
  ]);

  if (shouldUpgradeVersion) {
    await executeCommand("npm version patch --no-git-tag-version");
    const updatedPackageJson = await fs.readJson(
      path.resolve(__dirname, "../apps/api/package.json"),
    );
    version = updatedPackageJson.version;
    const newZipFileName = getZipFileName(version);
    await fs.rename(zipFileName, newZipFileName);
    zipFileName = newZipFileName;
  }

  const { shouldUpload } = await inquirer.prompt<{ shouldUpload: boolean }>([
    { type: "confirm", name: "shouldUpload", message: "Upload to server?" },
  ]);

  if (shouldUpload) {
    const serverPath = process.env.SERVER_SERVER_PATH;
    if (!serverPath) {
      console.error("Error: SERVER_SERVER_PATH environment variable is not set");
      return;
    }

    if (await fs.pathExists(zipFileName)) {
      try {
        await uploadToServer(zipFileName, serverPath);
        await unzipOnServer(zipFileName, serverPath);
        // Delete local zip after successful server-side extraction
        await fs.remove(zipFileName);
        console.log(`Deleted local zip: ${zipFileName}`);
      } catch (error) {
        console.error("Error during upload or extraction:", error);
      }
    } else {
      console.log(`Warning: Zip file not found ${zipFileName}`);
    }
  }

  await askForGitHubCommit(version, "server");
}

interface ZipOptions {
  type: "client" | "server";
  source: string | string[];
  output: string;
  includeBaseFolder: boolean;
}

async function createZip(options: ZipOptions): Promise<void> {
  const { type, source, output, includeBaseFolder } = options;

  return new Promise((resolve, reject) => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const stream = fs.createWriteStream(output);

    archive.on("error", (err) => reject(err));
    stream.on("close", () => resolve());

    archive.pipe(stream);

    if (type === "client") {
      if (typeof source !== "string") {
        throw new Error("Client source must be a string");
      }
      if (includeBaseFolder) {
        archive.directory(source, path.basename(source));
        console.log(`Adding directory to zip: ${path.basename(source)}`);
      } else {
        archive.directory(source, false);
        console.log(`Adding directory contents to zip: ${source}`);
      }
    } else if (type === "server") {
      if (!Array.isArray(source)) {
        throw new Error("Server source must be an array of strings");
      }
      source.forEach((file) => {
        const name = path.basename(file);
        const stats = fs.statSync(file);
        if (stats.isDirectory()) {
          archive.directory(file, name);
          console.log(`Adding directory to zip: ${name}`);
        } else {
          archive.file(file, { name });
          console.log(`Adding file to zip: ${name}`);
        }
      });
    }

    archive.finalize();
  });
}

async function main(): Promise<void> {
  changeToProjectRoot();
  const { buildType } = await inquirer.prompt<{
    buildType: "client" | "server" | "game-data-sdk" | "schema" | "all";
  }>([
    {
      type: "list",
      name: "buildType",
      message: "What would you like to build?",
      choices: ["client", "server", "game-data-sdk", "schema", "all"],
    },
  ]);

  await buildAndPackage(buildType);
}

function changeToProjectRoot() {
  // Assume script is in the scripts folder at project root
  chdir(__dirname + "/..");
}

async function buildGameDataSDK() {
  const sdkPath = path.resolve(__dirname, "..", "packages", "game-data-sdk");

  // Switch to game-data-sdk directory
  process.chdir(sdkPath);

  try {
    await executeCommand("pnpm run build");

    console.log("Updating game-data-sdk version...");
    const versionOutput = await executeCommand("npm version patch");
    const version = versionOutput.trim().replace("v", "");
    console.log(`game-data-sdk version updated to ${version}`);

    try {
      await executeCommand("pnpm run release");

      console.log("game-data-sdk published successfully");
    } catch (error) {
      console.error("Error during game-data-sdk publish:", error);
    }

    await askForGitHubCommit(version, "game-data-sdk");
  } finally {
    // Switch back to original directory
    process.chdir("../..");
  }
}

async function buildSchema() {
  const sdkPath = path.resolve(__dirname, "..", "packages", "schema");

  // Switch to schema directory
  process.chdir(sdkPath);

  try {
    await executeCommand("pnpm run build");

    console.log("Updating schema version...");
    const versionOutput = await executeCommand("npm version patch");
    const version = versionOutput.trim().replace("v", "");
    console.log(`schema version updated to ${version}`);

    try {
      await executeCommand("pnpm run release");
      console.log("schema published successfully");
    } catch (error) {
      console.error("Error during schema publish:", error);
    }

    await askForGitHubCommit(version, "schema");
  } finally {
    // Switch back to original directory
    process.chdir("../..");
  }
}

main().catch(console.error);
