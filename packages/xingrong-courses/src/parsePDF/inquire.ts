import fs from "fs";

import inquirer from "inquirer";

export async function inquire(folderPath: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "请选择操作：",
          choices: ["生成所有文件路径", "手动选取文件"],
        },
      ])
      .then((answers) => {
        if (answers.action === "生成所有文件路径") {
          const allFiles = listAllFiles(folderPath);
          allFiles.forEach((file) => console.log(file));
          resolve(allFiles.map(({ value }) => value));
        } else if (answers.action === "手动选取文件") {
          const files = listAllFiles(folderPath);
          inquirer
            .prompt([
              {
                type: "checkbox",
                name: "selectedFiles",
                message: "请选择要操作的文件：",
                choices: files,
              },
            ])
            .then((selected) => {
              const result = selected.selectedFiles.map((file) => file);
              resolve(result);
            });
        }
      });
  });
}

function listAllFiles(folderPath) {
  let files = fs.readdirSync(folderPath);
  // 筛选出以 .pdf 结尾的文件
  files = files.filter((file) => file.endsWith(".pdf"));

  files.sort((a, b) => {
    return parseFloat(a) - parseFloat(b);
  });

  // files
  return files.map((file, index) => ({
    name: `${index + 1}. ${file}`,
    value: `${folderPath}/${file}`,
  }));
}
