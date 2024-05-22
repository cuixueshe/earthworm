import { and, eq } from "drizzle-orm";

import { db } from "@earthworm/db";
import {
  coursePack as CoursePackSchema,
  course as courseSchema,
  statement as statementSchema,
} from "@earthworm/schema";

export async function createCoursePack(
  order: number,
  title: string,
  description: string,
  cover: string,
) {
  const [coursePackEntity] = await db
    .insert(CoursePackSchema)
    .values({
      order,
      title,
      description,
      isFree: true,
      cover,
    })
    .returning();

  return coursePackEntity;
}

export async function createCourses(
  coursePackId: string,
  order: number,
  title: string,
  description: string,
) {
  const [courseEntity] = await db
    .insert(courseSchema)
    .values({
      coursePackId,
      order,
      title,
      description,
    })
    .returning({ id: courseSchema.id, order: courseSchema.order, title: courseSchema.title });

  return courseEntity;
}

export async function createStatement(
  courseId: string,
  order: number,
  chinese: string,
  english: string,
  soundmark: string,
) {
  return await db.insert(statementSchema).values({
    chinese,
    english,
    soundmark,
    order,
    courseId,
  });
}

export async function updateStatement(
  courseId: string,
  chinese: string,
  english: string,
  order: number,
) {
  return db
    .update(statementSchema)
    .set({
      chinese,
      english,
    })
    .where(and(eq(statementSchema.courseId, courseId), eq(statementSchema.order, order)));
}

export async function updateCourseDescription(courseId: string, description: string) {
  return db
    .update(courseSchema)
    .set({
      description,
    })
    .where(eq(courseSchema.id, courseId));
}
