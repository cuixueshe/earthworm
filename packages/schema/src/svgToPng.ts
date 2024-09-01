import fs from "fs";
import path from "path";

import sharp from "sharp";

// 读取 SVG 文件
const svgBuffer = fs.readFileSync(path.join(__dirname, "../output.svg"));

// 使用 sharp 将 SVG 转换为 PNG
sharp(svgBuffer)
  .flatten({ background: { r: 255, g: 255, b: 255 } }) // 设置背景为白色
  .png()
  .toFile(path.join(__dirname, "../output.png"), (err, info) => {
    if (err) {
      console.error("Error converting SVG to PNG:", err);
    } else {
      console.log("Successfully converted SVG to PNG:", info);
    }
  });
