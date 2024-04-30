/**
 * 记录用户当前课程包的课程学习了多少次
 */
import { Inject, Injectable } from "@nestjs/common";
import { and, eq, sql } from "drizzle-orm";

import { courseHistory } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";

@Injectable()
export class CourseHistoryService {
  constructor(@Inject(DB) private db: DbType) {}

  async findAll(userId: string) {
    return await this.db.query.courseHistory.findMany({
      where: eq(courseHistory.userId, userId),
    });
  }

  async findByCoursePackId(userId: string, coursePackId: string) {
    return await this.db.query.courseHistory.findMany({
      columns: {
        id: true,
        coursePackId: true,
        courseId: true,
        completionCount: true,
      },
      where: and(eq(courseHistory.userId, userId), eq(courseHistory.coursePackId, coursePackId)),
    });
  }

  async findCompletionCount(userId: string, coursePackId: string, courseId: string) {
    const record = await this.db.query.courseHistory.findFirst({
      where: and(
        eq(courseHistory.userId, userId),
        eq(courseHistory.coursePackId, coursePackId),
        eq(courseHistory.courseId, courseId),
      ),
    });

    return record ? record.completionCount : 0;
  }

  async upsert(userId: string, coursePackId: string, courseId: string) {
    await this.db
      .insert(courseHistory)
      .values({
        coursePackId,
        courseId,
        userId,
        completionCount: 1,
      })
      .onConflictDoUpdate({
        target: [courseHistory.userId, courseHistory.courseId, courseHistory.coursePackId],
        set: { completionCount: sql`course_history.completion_count + 1` },
      });
  }
}
