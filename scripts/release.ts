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
        console.error(`标准错误: ${stderr}`);
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

async function buildAndPackage(type: "client" | "server" | "all"): Promise<void> {
  if (type === "client" || type === "all") {
    await buildClient();
  }
  if (type === "server" || type === "all") {
    await buildServer();
  }
}

async function buildClient(): Promise<void> {
  console.log("正在构建客户端...");
  await executeCommand("npm run build:client");

  const clientPackageJson = await fs.readJson(
    path.resolve(__dirname, "../apps/client/package.json"),
  );
  let version = clientPackageJson.version;

  const outputPath = path.resolve(__dirname, "../apps/client/.output/public");
  const getZipFileName = (v: string) => path.resolve(`client-v${v}.zip`);
  let zipFileName = getZipFileName(version);

  await createZip(outputPath, zipFileName, false);

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

  const { shouldCommit } = await inquirer.prompt<{ shouldCommit: boolean }>([
    { type: "confirm", name: "shouldCommit", message: "是否要提交到 GitHub？" },
  ]);

  if (shouldCommit) {
    try {
      // 1. 创建 commit
      const commitMessage = `release(client): v${version}`;
      await executeCommand(`git add .`);
      await executeCommand(`git commit -m "${commitMessage}"`);
      console.log(`已创建 commit: ${commitMessage}`);

      // 2. 推送到 GitHub
      await executeCommand(`git push origin main`);
      console.log("已成功推送到 GitHub");
    } catch (error) {
      console.error("GitHub 操作过程中出错:", error);
    }
  }
}

async function buildServer(): Promise<void> {
  console.log("正在构建服务器...");
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
  //       message: "是否要升级版本？",
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
  //     { type: "confirm", name: "shouldUpload", message: "是否要上传到服务器？" },
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
      console.log(`正在添加目录到压缩包: ${path.basename(source)}`);
    } else {
      archive.directory(source, false);
      console.log(`正在添加目录内容到压缩包: ${source}`);
    }

    archive.finalize();
  });
}

async function main(): Promise<void> {
  changeToProjectRoot();
  const { buildType } = await inquirer.prompt<{ buildType: "client" | "server" | "all" }>([
    {
      type: "list",
      name: "buildType",
      message: "您想要构建什么？",
      choices: ["client", "server", "all"],
    },
  ]);

  await buildAndPackage(buildType);
}

function changeToProjectRoot() {
  // 假设脚本位于项目根目录的 scripts 文件夹中
  chdir(__dirname + "/..");
}

main().catch(console.error);
