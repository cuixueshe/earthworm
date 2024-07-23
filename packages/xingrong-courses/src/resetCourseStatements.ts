import fs from "node:fs";
import path from "node:path";

import { eq } from "drizzle-orm";

import { db } from "@earthworm/db";
import { statement as statementSchema } from "@earthworm/schema";

type Statement = typeof statementSchema.$inferInsert;

(async function () {
  const courseId = "";
  const courseFileName = "";
  // 先删除
  // 然后在添加
  // 重置所有的课程 statement
  const courseDataJsonText = fs.readFileSync(
    path.resolve(__dirname, `../data/courses/${courseFileName}`),
    "utf-8",
  );

  const statementList = JSON.parse(courseDataJsonText) as Statement[];

  await deleteCourseAllStatements(courseId);
  await addCourseStatements(courseId, statementList);
  console.log("reset Successful");
  process.exit();
})();

export async function deleteCourseAllStatements(courseId: string) {
  await db.delete(statementSchema).where(eq(statementSchema.courseId, courseId));
  return true;
}

export async function addCourseStatements(courseId: string, statements: Statement[]) {
  const createStatementTasks = statements.map(({ chinese, english, soundmark }, sIndex) => {
    return db.insert(statementSchema).values({
      chinese,
      english,
      soundmark,
      order: sIndex + 1,
      courseId: courseId,
    });
  });

  await Promise.all(createStatementTasks);
  return;
}
