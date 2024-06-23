import { and, asc, eq } from "drizzle-orm";

import {
  courseHistory as courseHistorySchema,
  coursePack as CoursePackSchema,
  course as courseSchema,
  statement as statementSchema,
  userCourseProgress as userCourseProgressSchema,
} from "@earthworm/schema";
import type { CreateCoursePack, Statement, UpdateCoursePackBody } from "./schema";
import { db } from "~/db";
import { logger } from "~/utils/logger";
import { coursePackSchema } from "./schema";

export async function createCoursePack(coursePackInfo: CreateCoursePack) {
  // 1. TODO 需要一个 order
  // TODO 这里后面需要获取某个用户的所有 course pack
  const coursePackOrder = 8;

  const result = await db.transaction(async () => {
    const [coursePackEntity] = await db
      .insert(CoursePackSchema)
      .values({
        order: coursePackOrder,
        title: coursePackInfo.title,
        description: coursePackInfo.description,
        cover: coursePackInfo.cover,
        isFree: true,
      })
      .returning();

    for (const [cIndex, course] of coursePackInfo.courses.entries()) {
      const [courseEntity] = await db
        .insert(courseSchema)
        .values({
          coursePackId: coursePackEntity.id,
          order: cIndex + 1,
          title: course.title,
          description: course.description,
        })
        .returning({ id: courseSchema.id, order: courseSchema.order, title: courseSchema.title });

      logger.debug(
        `创建: id-${courseEntity.id} order-${courseEntity.order} title-${courseEntity.title}`,
      );

      const createStatementTasks = course.statements.map(
        async ({ chinese, english, phonetic }, sIndex) => {
          return db.insert(statementSchema).values({
            chinese,
            english,
            soundmark: phonetic,
            order: sIndex + 1,
            courseId: courseEntity.id,
          });
        },
      );

      logger.debug("开始创建 statements");
      await Promise.all(createStatementTasks);
      logger.debug("创建 statements 完成");
    }

    return {
      coursePackId: coursePackEntity.id,
      title: coursePackEntity.title,
    };
  });

  return result;
}

export async function deleteCoursePack(coursePackId: string) {
  try {
    const result = await db.transaction(async () => {
      // TODO 后续需要看看要删除的 coursePackId 是否存在 & 是否是自己帐号所拥有的
      const coursePack = await db.query.coursePack.findFirst({
        where: eq(CoursePackSchema.id, coursePackId),
      });

      if (!coursePack) {
        return false;
      }

      const courses = await db.query.course.findMany({
        where: eq(courseSchema.coursePackId, coursePackId),
      });

      const deleteStatementTasks = courses.map((course) => {
        return db.delete(statementSchema).where(eq(statementSchema.courseId, course.id));
      });

      await Promise.all(deleteStatementTasks);
      await db.delete(courseSchema).where(eq(courseSchema.coursePackId, coursePackId));
      await db.delete(CoursePackSchema).where(eq(CoursePackSchema.id, coursePackId));

      // 还需要删除 course_history
      // 和 user_course_progress 里面的记录
      // TODO 这里需要加一个 user id 的限制
      // await db
      //   .delete(courseHistorySchema)
      //   .where(eq(courseHistorySchema.coursePackId, coursePackId));

      // await db
      //   .delete(userCourseProgressSchema)
      //   .where(eq(userCourseProgressSchema.coursePackId, coursePackId));

      return true;
    });

    return result;
  } catch (error) {
    logger.error(error);
    return false;
  }
}

export async function updateCoursePack(coursePackId: string, coursePackInfo: UpdateCoursePackBody) {
  try {
    const result = await db.transaction(async () => {
      const coursePack = await db.query.coursePack.findFirst({
        where: eq(CoursePackSchema.id, coursePackId),
      });

      if (!coursePack) {
        return false;
      }

      _updateCoursePack();
      _updateCourses();

      return true;
    });

    return result;
  } catch (error) {
    logger.error(error);
    return false;
  }

  async function _updateCoursePack() {
    await db
      .update(CoursePackSchema)
      .set({
        title: coursePackInfo.title,
        description: coursePackInfo.description,
        cover: coursePackInfo.cover,
      })
      .where(eq(CoursePackSchema.id, coursePackId));
  }

  async function _updateCourses() {
    let oldIndex = 0;
    let newIndex = 0;

    const courses = await db.query.course.findMany({
      where: eq(courseSchema.coursePackId, coursePackId),
      orderBy: [asc(courseSchema.order)],
    });

    while (oldIndex < courses.length && newIndex < coursePackInfo.courses.length) {
      const oldCourse = courses[oldIndex];
      const newCourseInfo = coursePackInfo.courses[newIndex];

      await db
        .update(courseSchema)
        .set({
          title: newCourseInfo.title,
          description: newCourseInfo.description,
        })
        .where(eq(courseSchema.id, oldCourse.id));

      await _updateStatements(oldCourse.id, newCourseInfo.statements);

      oldIndex++;
      newIndex++;
    }

    // 如果新的课程信息更多，创建剩余的新课程
    while (newIndex < coursePackInfo.courses.length) {
      const newCourseInfo = coursePackInfo.courses[newIndex];
      const [courseEntity] = await db
        .insert(courseSchema)
        .values({
          title: newCourseInfo.title,
          description: newCourseInfo.description,
          order: newIndex + 1,
          coursePackId: coursePackId,
        })
        .returning({ id: courseSchema.id, order: courseSchema.order, title: courseSchema.title });

      const createStatementTasks = newCourseInfo.statements.map(
        async ({ chinese, english, phonetic }, sIndex) => {
          return db.insert(statementSchema).values({
            chinese,
            english,
            soundmark: phonetic,
            order: sIndex + 1,
            courseId: courseEntity.id,
          });
        },
      );

      logger.debug("开始创建 statements");
      await Promise.all(createStatementTasks);
      logger.debug("创建 statements 完成");

      newIndex++;
    }

    // 如果旧的课程信息更多，删除剩余的旧课程
    while (oldIndex < courses.length) {
      const oldCourse = courses[oldIndex];
      await db.delete(statementSchema).where(eq(statementSchema.courseId, oldCourse.id));
      await db.delete(courseSchema).where(eq(courseSchema.id, oldCourse.id));

      // TODO 这里需要加一个 user id 的限制
      // 还需要删除 course_history
      // 和 user_course_progress 里面的记录
      // await db
      //   .delete(courseHistorySchema)
      //   .where(eq(courseHistorySchema.coursePackId, coursePackId));

      // await db
      //   .delete(userCourseProgressSchema)
      //   .where(eq(userCourseProgressSchema.coursePackId, coursePackId));

      oldIndex++;
    }
  }

  async function _updateStatements(courseId: string, newStatements: Statement[]) {
    const oldStatements = await db.query.statement.findMany({
      where: eq(statementSchema.courseId, courseId),
      orderBy: [asc(statementSchema.order)],
    });

    let oldIndex = 0;
    let newIndex = 0;

    while (oldIndex < oldStatements.length && newIndex < newStatements.length) {
      const newStatementInfo = newStatements[newIndex];
      const oldStatement = oldStatements[oldIndex];

      await db
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
      await db.insert(statementSchema).values({
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
      await db.delete(statementSchema).where(and(eq(statementSchema.id, oldStatement.id)));
      oldIndex++;
    }
  }
}
