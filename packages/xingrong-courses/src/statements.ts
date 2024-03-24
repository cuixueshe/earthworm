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

  let orderIndex = 1;
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    const cId = parseInt(path.parse(course).name);
    const courseDataText = fs.readFileSync(
      path.resolve(__dirname, `../data/courses/${course}`),
      "utf-8"
    );

    const courseData = JSON.parse(courseDataText);

    const promiseAll = courseData.map((statement: any, index: number) => {
      const { chinese, english, soundmark } = statement;

      const result = createStatement(
        orderIndex,
        chinese,
        english,
        soundmark,
        cId
      );
      orderIndex++;
      return result;
    });

    console.log(`开始上传： courseName:${course}`);
    await Promise.all(promiseAll);
    console.log(`courseName: ${course} 全部上传成功`);
  }
  process.exit(0);
})();
