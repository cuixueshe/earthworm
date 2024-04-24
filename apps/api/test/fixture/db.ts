import { course, coursePack, statement } from "@earthworm/schema";
import { CreateCoursePackDto } from "../../src/course-pack/dto/create-course-pack.dto";

export async function insertCoursePack(db, dto?: CreateCoursePackDto) {
  const options = Object.assign(
    {
      title: "课程包",
      description: "这是一个课程包",
      isFree: true,
      difficulty: 1,
    },
    dto,
  );

  const [entity] = await db
    .insert(coursePack)
    .values({
      title: options.title,
      description: options.description,
      isFree: options.isFree || true,
    })
    .returning();

  return entity;
}

export async function insertCourse(db, coursePackId: number, title: string = "") {
  const [entity] = await db
    .insert(course)
    .values({
      title: title || "第一课",
      coursePackId,
    })
    .returning();

  return entity;
}

export async function insertStatement(db, courseId, order = 1) {
  const [entity] = await db
    .insert(statement)
    .values({
      order,
      chinese: "你好",
      english: "hello",
      soundmark: "nihao",
      courseId,
    })
    .returning();

  return entity;
}
