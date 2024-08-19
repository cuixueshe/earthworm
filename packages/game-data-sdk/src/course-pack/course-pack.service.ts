import { and, asc, eq } from "drizzle-orm";

import {
  courseHistory as courseHistorySchema,
  coursePack as coursePackSchema,
  course as courseSchema,
  statement as statementSchema,
  userCourseProgress as userCourseProgressSchema,
} from "@earthworm/schema";
import type { CreateCoursePack, Statement, UpdateCoursePack } from "./course-pack.model";
import { db } from "../db";

export async function createCoursePack(coursePackInfo: CreateCoursePack) {
  const result = await db.transaction(async (tx) => {
    const coursePackOrder = await calculateCoursePackOrder(coursePackInfo.uId);

    const [coursePackEntity] = await tx
      .insert(coursePackSchema)
      .values({
        order: coursePackOrder,
        creatorId: coursePackInfo.uId,
        shareLevel: coursePackInfo.shareLevel,
        title: coursePackInfo.title,
        description: coursePackInfo.description,
        cover: coursePackInfo.cover,
        isFree: true,
      })
      .returning();

    const courseIds: string[] = [];
    for (const [cIndex, course] of coursePackInfo.courses.entries()) {
      const [courseEntity] = await tx
        .insert(courseSchema)
        .values({
          coursePackId: coursePackEntity.id,
          order: cIndex + 1,
          title: course.title,
          description: course.description,
          learningContent: course.learningContent,
        })
        .returning({
          id: courseSchema.id,
          order: courseSchema.order,
          title: courseSchema.title,
        });

      courseIds.push(courseEntity.id.toString());

      const createStatementTasks = course.statements.map(
        ({ chinese, english, phonetic }, sIndex) => {
          return tx.insert(statementSchema).values({
            chinese,
            english,
            soundmark: phonetic,
            order: sIndex + 1,
            courseId: courseEntity.id,
          });
        },
      );

      await Promise.all(createStatementTasks);
    }

    return {
      coursePackId: coursePackEntity.id,
      courseIds,
    };

    async function calculateCoursePackOrder(userId: string) {
      const entity = await tx.query.coursePack.findFirst({
        orderBy: (table, { desc }) => [desc(table.order)],
        where: (table, { eq }) => eq(table.creatorId, userId),
      });

      if (entity) {
        return entity.order + 1;
      }

      return 1;
    }
  });

  return result;
}

export async function deleteCoursePack(coursePackId: string) {
  const result = await db.transaction(async (tx) => {
    const coursePack = await tx.query.coursePack.findFirst({
      where: eq(coursePackSchema.id, coursePackId),
    });

    if (!coursePack) {
      throw new Error("not found course pack");
    }

    const courses = await tx.query.course.findMany({
      where: eq(courseSchema.coursePackId, coursePackId),
    });

    const deleteStatementTasks = courses.map((course) => {
      return tx.delete(statementSchema).where(eq(statementSchema.courseId, course.id));
    });

    await Promise.all(deleteStatementTasks);
    await tx.delete(courseSchema).where(eq(courseSchema.coursePackId, coursePackId));
    await tx.delete(coursePackSchema).where(eq(coursePackSchema.id, coursePackId));

    // 还需要删除 course_history
    // 和 user_course_progress 里面的记录
    await tx.delete(courseHistorySchema).where(eq(courseHistorySchema.coursePackId, coursePackId));

    await tx
      .delete(userCourseProgressSchema)
      .where(eq(userCourseProgressSchema.coursePackId, coursePackId));

    return true;
  });

  return result;
}

export async function updateCoursePack(coursePackId: string, coursePackInfo: UpdateCoursePack) {
  const result = await db.transaction(async (tx) => {
    async function _updateCoursePack() {
      await tx
        .update(coursePackSchema)
        .set({
          title: coursePackInfo.title,
          description: coursePackInfo.description,
          cover: coursePackInfo.cover,
          shareLevel: coursePackInfo.shareLevel,
        })
        .where(eq(coursePackSchema.id, coursePackId));
    }

    async function _updateCourses() {
      const courseIds: string[] = [];
      const oldCourses = await tx.query.course.findMany({
        where: eq(courseSchema.coursePackId, coursePackId),
        orderBy: [asc(courseSchema.order)],
      });

      const oldCourseMap = new Map(oldCourses.map((course) => [course.id, course]));
      const newCourseMap = new Map(
        coursePackInfo.courses.map((course) => [course.publishCourseId, course]),
      );

      // 新的在老的里面存在  那么更新
      for (const [newCourseIndex, newCourseInfo] of coursePackInfo.courses.entries()) {
        if (oldCourseMap.has(newCourseInfo.publishCourseId)) {
          // Update existing course
          await tx
            .update(courseSchema)
            .set({
              title: newCourseInfo.title,
              description: newCourseInfo.description,
              order: newCourseIndex + 1,
              learningContent: newCourseInfo.learningContent,
            })
            .where(eq(courseSchema.id, newCourseInfo.publishCourseId));

          courseIds.push(newCourseInfo.publishCourseId);

          await _updateStatements(newCourseInfo.publishCourseId, newCourseInfo.statements);
        } else {
          // Create new course
          // 新的在老的里面不存在 那么创建
          const [courseEntity] = await tx
            .insert(courseSchema)
            .values({
              title: newCourseInfo.title,
              description: newCourseInfo.description,
              order: newCourseIndex + 1,
              coursePackId: coursePackId,
              learningContent: newCourseInfo.learningContent,
            })
            .returning({
              id: courseSchema.id,
              order: courseSchema.order,
              title: courseSchema.title,
            });

          courseIds.push(courseEntity.id.toString());

          const createStatementTasks = newCourseInfo.statements.map(
            async ({ chinese, english, phonetic }, sIndex) => {
              return tx.insert(statementSchema).values({
                chinese,
                english,
                soundmark: phonetic,
                order: sIndex + 1,
                courseId: courseEntity.id,
              });
            },
          );

          await Promise.all(createStatementTasks);
        }
      }

      // 老的在新的里面不存在 那么删除
      for (const oldCourse of oldCourses) {
        if (!newCourseMap.has(oldCourse.id)) {
          // Delete course if it is not in the new course pack info
          await tx.delete(statementSchema).where(eq(statementSchema.courseId, oldCourse.id));
          await tx.delete(courseSchema).where(eq(courseSchema.id, oldCourse.id));

          // Delete related records in course_history and user_course_progress
          await tx
            .delete(courseHistorySchema)
            .where(
              and(
                eq(courseHistorySchema.coursePackId, coursePackId),
                eq(courseHistorySchema.courseId, oldCourse.id),
              ),
            );

          await tx
            .delete(userCourseProgressSchema)
            .where(
              and(
                eq(userCourseProgressSchema.coursePackId, coursePackId),
                eq(userCourseProgressSchema.courseId, oldCourse.id),
              ),
            );
        }
      }

      return courseIds;
    }

    async function _updateStatements(courseId: string, newStatements: Statement[]) {
      const oldStatements = await tx.query.statement.findMany({
        where: eq(statementSchema.courseId, courseId),
        orderBy: [asc(statementSchema.order)],
      });

      let oldIndex = 0;
      let newIndex = 0;

      while (oldIndex < oldStatements.length && newIndex < newStatements.length) {
        const newStatementInfo = newStatements[newIndex];
        const oldStatement = oldStatements[oldIndex];

        await tx
          .update(statementSchema)
          .set({
            english: newStatementInfo.english,
            chinese: newStatementInfo.chinese,
            soundmark: newStatementInfo.phonetic,
          })
          .where(eq(statementSchema.id, oldStatement.id));

        oldIndex++;
        newIndex++;
      }

      // 如果新的课程statements更多，创建剩余的新课程
      while (newIndex < newStatements.length) {
        const newStatementInfo = newStatements[newIndex];
        await tx.insert(statementSchema).values({
          english: newStatementInfo.english,
          chinese: newStatementInfo.chinese,
          soundmark: newStatementInfo.phonetic,
          order: newIndex + 1,
          courseId,
        });
        newIndex++;
      }

      // 如果旧的课程信息更多，删除剩余的旧课程
      while (oldIndex < oldStatements.length) {
        const oldStatement = oldStatements[oldIndex];
        await tx.delete(statementSchema).where(and(eq(statementSchema.id, oldStatement.id)));
        oldIndex++;
      }
    }

    const coursePack = await tx.query.coursePack.findFirst({
      where: and(
        eq(coursePackSchema.id, coursePackId),
        eq(coursePackSchema.creatorId, coursePackInfo.uId),
      ),
    });

    if (!coursePack) {
      throw new Error("not found course pack");
    }

    await _updateCoursePack();
    const courseIds = await _updateCourses();

    return { courseIds };
  });

  return result;
}
