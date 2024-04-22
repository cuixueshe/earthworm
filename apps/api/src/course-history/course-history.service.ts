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

  async findByCoursePackId(userId: string, coursePackId: number) {
    return await this.db.query.courseHistory.findMany({
      where: and(eq(courseHistory.userId, userId), eq(courseHistory.coursePackId, coursePackId)),
    });
  }

  async upsert(userId: string, coursePackId: number, courseId: number) {
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
