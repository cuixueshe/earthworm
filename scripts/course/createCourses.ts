import { course as courseSchema } from "@shared/schema";
import fs from "fs";
import path from "path";
import { db } from "./db";
const courses = fs.readdirSync(path.resolve(__dirname, "./courses"));

(async function () {
  await db.delete(courseSchema);

  for (const [index, course] of courses.entries()) {
    const [response] = await db.insert(courseSchema).values({
      id: index + 1,
      title: convertToChineseNumber(path.parse(course).name),
    });

    console.log("创建:", course);
  }

  console.log("全部创建完成");
  process.exit(0);
})();

function convertToChineseNumber(numStr: string): string {
  const chineseNumbers = [
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
  ];
  let chineseStr = "第";
  if (parseInt(numStr) >= 10) {
    const [tens, ones] = numStr.split("");
    if (tens !== "1") {
      chineseStr += chineseNumbers[parseInt(tens, 10)];
    }
    chineseStr += "十";
    if (ones !== "0") {
      chineseStr += chineseNumbers[parseInt(ones, 10)];
    }
  } else {
    chineseStr += chineseNumbers[parseInt(numStr, 10)];
  }
  chineseStr += "课";
  return chineseStr;
}
