import { exec } from "child_process";
import path from "path";
import { chdir } from "process";

import archiver from "archiver";
import fs from "fs-extra";
import inquirer from "inquirer";
import semver from "semver";

// 模拟上传到服务器的函数
function uploadToServer(filePath: string, serverPath: string): void {
  console.log(`Uploading ${filePath} to ${serverPath}`);
  // 实际上传逻辑应该在这里实现
}

// 模拟在服务器上解压文件的函数
function unzipOnServer(filePath: string, serverPath: string): void {
  console.log(`Unzipping ${filePath} on server at ${serverPath}`);
  // 实际解压逻辑应该在这里实现
}

async function buildAndPackage(type: "client" | "server" | "all"): Promise<void> {
  if (type === "client" || type === "all") {
    await buildClient();
  }
  if (type === "server" || type === "all") {
    await buildServer();
  }
}

async function buildClient(): Promise<void> {
  console.log("Building client...");
  await executeCommand("npm run build:client");

  const clientPackageJson = await fs.readJson(
    path.resolve(__dirname, "../apps/client/package.json"),
  );
  let version = clientPackageJson.version;

  const outputPath = path.resolve(__dirname, "../apps/client/.output/public");
  const zipFileName = path.resolve(`client-${version}.zip`);

  await createZip(outputPath, zipFileName, false);

  const { shouldUpgradeVersion } = await inquirer.prompt<{ shouldUpgradeVersion: boolean }>([
    {
      type: "confirm",
      name: "shouldUpgradeVersion",
      message: "Do you want to upgrade the version?",
    },
  ]);

  if (shouldUpgradeVersion) {
    const newVersion = semver.inc(version, "patch");
    if (newVersion) {
      version = newVersion;
      clientPackageJson.version = version;
      await fs.writeJson("apps/client/package.json", clientPackageJson, { spaces: 2 });
      await fs.rename(zipFileName, `client-v${version}.zip`);
    }
  }

  const { shouldUpload } = await inquirer.prompt<{ shouldUpload: boolean }>([
    { type: "confirm", name: "shouldUpload", message: "Do you want to upload to the server?" },
  ]);

  if (shouldUpload) {
    const serverPath = "/path/to/server/client"; // 替换为实际的服务器路径
    uploadToServer(`client-${version}.zip`, serverPath);
    unzipOnServer(`client-${version}.zip`, serverPath);
  }
}

async function buildServer(): Promise<void> {
  console.log("Building server...");
  await executeCommand("npm run build:serve");

  //   const serverPackageJson = await fs.readJson("apps/api/package.json");
  //   let version = serverPackageJson.version;

  //   const outputPath = "apps/api/dist";
  //   const zipFileName = `server-${version}.zip`;

  //   await createZip(outputPath, zipFileName, true);

  //   const { shouldUpgradeVersion } = await inquirer.prompt<{ shouldUpgradeVersion: boolean }>([
  //     {
  //       type: "confirm",
  //       name: "shouldUpgradeVersion",
  //       message: "Do you want to upgrade the version?",
  //     },
  //   ]);

  //   if (shouldUpgradeVersion) {
  //     const newVersion = semver.inc(version, "patch");
  //     if (newVersion) {
  //       version = newVersion;
  //       serverPackageJson.version = version;
  //       await fs.writeJson("apps/api/package.json", serverPackageJson, { spaces: 2 });
  //       await fs.rename(zipFileName, `server-${version}.zip`);
  //     }
  //   }

  //   const { shouldUpload } = await inquirer.prompt<{ shouldUpload: boolean }>([
  //     { type: "confirm", name: "shouldUpload", message: "Do you want to upload to the server?" },
  //   ]);

  //   if (shouldUpload) {
  //     const serverPath = "/path/to/server/api"; // 替换为实际的服务器路径
  //     uploadToServer(`server-${version}.zip`, serverPath);
  //     unzipOnServer(`server-${version}.zip`, serverPath);
  //   }
}

async function createZip(
  source: string,
  output: string,
  includeBaseFolder: boolean,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const stream = fs.createWriteStream(output);

    archive.on("error", (err) => reject(err));
    stream.on("close", () => resolve());

    archive.pipe(stream);

    if (includeBaseFolder) {
      archive.directory(source, path.basename(source));
      console.log(`Adding directory to zip: ${path.basename(source)}`);
    } else {
      archive.directory(source, false);
      console.log(`Adding contents of directory to zip: ${source}`);
    }

    archive.finalize();
  });
}

function executeCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log(`Executing command: ${command}`);
    console.log("In directory:", process.cwd());
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }
      console.log(`Stdout: ${stdout}`);
      resolve(stdout);
    });
  });
}

async function main(): Promise<void> {
  changeToProjectRoot();
  const { buildType } = await inquirer.prompt<{ buildType: "client" | "server" | "all" }>([
    {
      type: "list",
      name: "buildType",
      message: "What do you want to build?",
      choices: ["client", "server", "all"],
    },
  ]);

  await buildAndPackage(buildType);
}

function changeToProjectRoot() {
  // 假设脚本位于项目根目录的 scripts 文件夹中
  chdir(__dirname + "/..");
  console.log("Current working directory:", process.cwd());
}

main().catch(console.error);
