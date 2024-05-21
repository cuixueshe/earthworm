// 用于批量更新 course 的 statements
// 给定 course id  然后基于 order 来更新 statement 的 chinese & english & soundmark
// 使用方式：
// 1. 把需要更新的数据放到 ./data/course-pack.json 内
// 2. 把需要更新的 course id 放到  courses 数组中 (程序会按照顺序来进行更新)
import { and, eq } from "drizzle-orm";

import { db } from "@earthworm/db";
import { statement as statementSchema } from "@earthworm/schema";
import { createCoursePack } from "./coursePack";
import { readInputCoursePack } from "./input";

const coursePack = createCoursePack(readInputCoursePack());

const courses: string[] = [];

(async function () {
  coursePack.courses.forEach(async (course, cOrder) => {
    console.log(`course: ${courses[cOrder]}`);
    const courseId = courses[cOrder];
    const task = course.statements.map((statement, index) => {
      const order = index + 1;
      return updateStatement(courseId, statement.chinese, statement.english, order);
    });

    await Promise.all(task);
    console.log("更新完成");
  });
})();

async function updateStatement(courseId: string, chinese: string, english: string, order: number) {
  return db
    .update(statementSchema)
    .set({
      chinese,
      english,
    })
    .where(and(eq(statementSchema.courseId, courseId), eq(statementSchema.order, order)));
}
