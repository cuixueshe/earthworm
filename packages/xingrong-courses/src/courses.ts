import fs from "fs";
import path from "path";

import { db } from "@earthworm/db";
import {
  coursePack,
  course as courseSchema,
  statement as statementSchema,
} from "@earthworm/schema";

const courses = fs.readdirSync(path.resolve(__dirname, "../data/courses"));

(async function () {
  await db.delete(coursePack);
  await db.delete(statementSchema);
  await db.delete(courseSchema);

  // 先创建一个 coursePack 数据
  const [coursePackEntity] = await db
    .insert(coursePack)
    .values({
      title: "星荣零基础学英语",
      description: "最适合零基础入门的课程",
      isFree: true,
    })
    .returning();

  for (const [index, course] of courses.entries()) {
    const [response] = await db
      .insert(courseSchema)
      .values({
        id: index + 1,
        title: convertToChineseNumber(path.parse(course).name),
        coursePackId: coursePackEntity.id,
      })
      .returning({ id: courseSchema.id, title: courseSchema.title });

    console.log(`创建: id-${response.id} title-${response.title}`);
  }

  console.log("全部创建完成");
  process.exit(0);
})();

function convertToChineseNumber(numStr: string): string {
  const chineseNumbers = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
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
