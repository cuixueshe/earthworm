import { exec as childProcessExec } from "child_process";
import path from "path";
import { chdir } from "process";

import archiver from "archiver";
import fs from "fs-extra";
import inquirer from "inquirer";
import semver from "semver";

// 执行命令的通用函数
function executeCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log(`执行命令: ${command}`);
    console.log("当前目录:", process.cwd());
    childProcessExec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`错误: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.log(`${stderr}`);
      }
      console.log(`标准输出: ${stdout}`);
      resolve(stdout);
    });
  });
}

// 模拟上传到服务器的函数
function uploadToServer(filePath: string, serverPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`正在上传 ${filePath} 到 ${serverPath}`);
    const uploadCommand = `scp ${filePath} earthworm-server:${serverPath}`;
    executeCommand(uploadCommand)
      .then(() => {
        console.log(`文件成功上传到服务器`);
        resolve();
      })
      .catch((error) => {
        console.error(`上传失败: ${error.message}`);
        reject(error);
      });
  });
}

// 模拟在服务器上解压文件的函数
function unzipOnServer(filePath: string, serverPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`正在服务器上解压 ${filePath} 到 ${serverPath}`);
    const unzipCommand = `ssh earthworm-server "cd ${serverPath} && unzip -o ${path.basename(filePath)}"`;
    executeCommand(unzipCommand)
      .then(() => {
        console.log(`文件成功在服务器上解压`);
        resolve();
      })
      .catch((error) => {
        console.error(`解压失败: ${error.message}`);
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
    { type: "confirm", name: "shouldCommit", message: "是否要提交到 GitHub？" },
  ]);

  if (shouldCommit) {
    try {
      const commitMessage = `release(${packageName}): v${version}`;
      await executeCommand(`git add .`);
      await executeCommand(`git commit -m "${commitMessage}"`);
      console.log(`已创建 commit: ${commitMessage}`);

      await executeCommand(`git push origin main`);
      console.log("已成功推送到 GitHub");
    } catch (error) {
      console.error("GitHub 操作过程中出错:", error);
    }
  }
}

async function buildClient(): Promise<void> {
  console.log("正在构建 Client...");
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
      message: "是否要升级版本？",
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
    { type: "confirm", name: "shouldUpload", message: "是否要上传到服务器？" },
  ]);

  if (shouldUpload) {
    const serverPath = process.env.CLIENT_SERVER_PATH;
    if (!serverPath) {
      console.error("错误：未设置 CLIENT_SERVER_PATH 环境变量");
      return;
    }

    if (await fs.pathExists(zipFileName)) {
      try {
        await uploadToServer(zipFileName, serverPath);
        await unzipOnServer(zipFileName, serverPath);
        // 在服务器端解压成功后，删除本地压缩包
        await fs.remove(zipFileName);
        console.log(`已删除本地压缩包: ${zipFileName}`);
      } catch (error) {
        console.error("上传或解压过程中出错:", error);
      }
    } else {
      console.log(`警告：未找到压缩包 ${zipFileName}`);
    }
  }

  await askForGitHubCommit(version, "client");
}

async function buildServer(): Promise<void> {
  console.log("正在构建 Api...");
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
      message: "是否要升级版本？",
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
    { type: "confirm", name: "shouldUpload", message: "是否要上传到服务器？" },
  ]);

  if (shouldUpload) {
    const serverPath = process.env.SERVER_SERVER_PATH;
    if (!serverPath) {
      console.error("错误：未设置 SERVER_SERVER_PATH 环境变量");
      return;
    }

    if (await fs.pathExists(zipFileName)) {
      try {
        await uploadToServer(zipFileName, serverPath);
        await unzipOnServer(zipFileName, serverPath);
        // 在服务器端解压成功后，删除本地压缩包
        await fs.remove(zipFileName);
        console.log(`已删除本地压缩包: ${zipFileName}`);
      } catch (error) {
        console.error("上传或解压过程中出错:", error);
      }
    } else {
      console.log(`警告：未找到压缩包 ${zipFileName}`);
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
        console.log(`正在添加目录到压缩包: ${path.basename(source)}`);
      } else {
        archive.directory(source, false);
        console.log(`正在添加目录内容到压缩包: ${source}`);
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
          console.log(`正在添加目录到压缩包: ${name}`);
        } else {
          archive.file(file, { name });
          console.log(`正在添加文件到压缩包: ${name}`);
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
      message: "您想要构建什么？",
      choices: ["client", "server", "game-data-sdk", "schema", "all"],
    },
  ]);

  await buildAndPackage(buildType);
}

function changeToProjectRoot() {
  // 假设脚本位于项目根目录的 scripts 文件夹中
  chdir(__dirname + "/..");
}

async function buildGameDataSDK() {
  const sdkPath = path.resolve(__dirname, "..", "packages", "game-data-sdk");

  // 切换到 game-data-sdk 目录
  process.chdir(sdkPath);

  try {
    await executeCommand("pnpm run build");

    console.log("正在更新 game-data-sdk 版本...");
    const versionOutput = await executeCommand("npm version patch");
    const version = versionOutput.trim().replace("v", "");
    console.log(`game-data-sdk 版本已更新到 ${version}`);

    try {
      await executeCommand("pnpm run release");

      console.log("game-data-sdk 发布成功");
    } catch (error) {
      console.error("game-data-sdk 发布过程中出现错误:", error);
    }

    await askForGitHubCommit(version, "game-data-sdk");
  } finally {
    // 切回原目录
    process.chdir("../..");
  }
}

async function buildSchema() {
  const sdkPath = path.resolve(__dirname, "..", "packages", "schema");

  // 切换到 schema 目录
  process.chdir(sdkPath);

  try {
    await executeCommand("pnpm run build");

    console.log("正在更新 schema 版本...");
    const versionOutput = await executeCommand("npm version patch");
    const version = versionOutput.trim().replace("v", "");
    console.log(`schema 版本已更新到 ${version}`);

    try {
      await executeCommand("pnpm run release");
      console.log("schema 发布成功");
    } catch (error) {
      console.error("schema 发布过程中出现错误:", error);
    }

    await askForGitHubCommit(version, "schema");
  } finally {
    // 切回原目录
    process.chdir("../..");
  }
}

main().catch(console.error);
