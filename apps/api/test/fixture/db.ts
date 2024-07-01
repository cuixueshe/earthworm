import { DbType } from "src/global/providers/db.provider";

import { course, coursePack, statement, userCourseProgress } from "@earthworm/schema";
import { getTokenOwner } from "../../test/fixture/user";

type CoursePackInsert = typeof coursePack.$inferInsert;

export async function insertCoursePack(db: DbType, values?: Partial<CoursePackInsert>) {
  const defaultCoursePack = {
    order: 1,
    title: "课程包",
    description: "这是一个课程包",
    isFree: true,
    creatorId: "test",
    shareLevel: "public",
  } satisfies CoursePackInsert;

  const [entity] = await db
    .insert(coursePack)
    .values({
      ...defaultCoursePack,
      ...values,
    })
    .returning();

  return entity;
}

type CourseInsert = typeof course.$inferInsert;
export async function insertCourse(
  db: DbType,
  coursePackId: string,
  values?: Partial<CourseInsert>,
) {
  const defaultCourse = {
    order: 1,
    title: "第一课",
    coursePackId,
  } satisfies CourseInsert;

  const [entity] = await db
    .insert(course)
    .values({
      ...defaultCourse,
      ...values,
    })
    .returning();

  return entity;
}

type StatementInsert = typeof statement.$inferInsert;
export async function insertStatement(
  db: DbType,
  courseId: string,
  order: number,
  values?: Partial<StatementInsert>,
) {
  const defaultStatement = {
    order,
    courseId,
    chinese: "你好",
    english: "hello",
    soundmark: "nihao",
  } satisfies StatementInsert;

  const [entity] = await db
    .insert(statement)
    .values({
      ...defaultStatement,
      ...values,
    })
    .returning();

  return entity;
}

export async function insertUserCourseProgress(
  db,
  coursePackId: string,
  courseId: string,
  statementIndex: number,
) {
  const [entity] = await db
    .insert(userCourseProgress)
    .values({
      userId: getTokenOwner(),
      coursePackId,
      courseId,
      statementIndex,
    })
    .returning();

  return entity;
}
