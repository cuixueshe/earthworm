import { db } from "@earthworm/db";
import { statement } from "@earthworm/schema";
import fs from "node:fs";
import path from "node:path";

const courses = fs.readdirSync(path.resolve(__dirname, "../data/courses"));

(async function () {
  await db.delete(statement);

  function createStatement(
    order: number,
    chinese: string,
    english: string,
    soundmark: string,
    courseId: number
  ) {
    return db.insert(statement).values({
      order,
      chinese,
      english,
      soundmark,
      courseId,
    });
  }

  const dsStorePath = path.join(__dirname, ".DS_Store");

  // 检查.DS_Store文件是否存在
  fs.access(dsStorePath, fs.constants.F_OK, (err) => {
    if (err) {
      // 文件不存在
      console.log(".DS_Store文件不存在");
    } else {
      // 文件存在，执行删除操作
      fs.unlink(dsStorePath, (err) => {
        if (err) {
          console.error("删除.DS_Store文件时出错:", err);
        } else {
          console.log(".DS_Store文件已被成功删除");
        }
      });
    }
  });

  let orderIndex = 1;
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    const cId = parseInt(path.parse(course).name);
    const courseDataText = fs.readFileSync(
      path.resolve(__dirname, `../data/courses/${course}`),
      "utf-8"
    );

    const courseData = JSON.parse(courseDataText);
    console.log(`开始上传： courseName:${course}`);
    for (let j = 0; j < courseData.length; j++) {
      const statement = courseData[j];
      const { chinese, english, soundmark } = statement;
      const result = createStatement(
        orderIndex,
        chinese,
        english,
        soundmark,
        cId
      );
      orderIndex++;
      try {
        await result;
      } catch (e) {
        console.error(`上传失败： courseName:${course} statement:${chinese}`);
        console.error(e);
      }
    }

    console.log(`courseName: ${course} 全部上传成功`);
  }
  process.exit(0);
})();
