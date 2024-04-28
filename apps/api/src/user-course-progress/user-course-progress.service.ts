import { Inject, Injectable } from "@nestjs/common";
import { and, asc, desc, eq } from "drizzle-orm";

import { coursePack, userCourseProgress } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";

@Injectable()
export class UserCourseProgressService {
  constructor(@Inject(DB) private db: DbType) {}

  async findStatement(userId: string, coursePackId: string, courseId: string) {
    const result = await this.db.query.userCourseProgress.findFirst({
      where: and(
        eq(userCourseProgress.userId, userId),
        eq(userCourseProgress.coursePackId, coursePackId),
        eq(userCourseProgress.courseId, courseId),
      ),
    });

    return result ? result.statementIndex : 0;
  }

  async getUserRecentCoursePacks(userId: string, limit: number) {
    // TODO 先按照 1 个课程来搞
    // 后面需要处理多个课程 需要去重
    // 后续把进度拆开 分成 coursePack 的进度 和 course 的进度
    const userCourseProgressResult = await this.db
      .select({
        id: userCourseProgress.id,
        coursePackId: userCourseProgress.coursePackId,
        courseId: userCourseProgress.courseId,
        title: coursePack.title,
        description: coursePack.description,
      })
      .from(userCourseProgress)
      .where(eq(userCourseProgress.userId, userId))
      .orderBy(desc(userCourseProgress.updatedAt))
      .limit(limit)
      .leftJoin(coursePack, eq(userCourseProgress.coursePackId, coursePack.id));

    return userCourseProgressResult;
  }

  async upsert(userId: string, coursePackId: string, courseId: string, statementIndex: number) {
    await this.db
      .insert(userCourseProgress)
      .values({
        userId,
        coursePackId,
        courseId,
        statementIndex,
      })
      .onConflictDoUpdate({
        target: [
          userCourseProgress.userId,
          userCourseProgress.coursePackId,
          userCourseProgress.courseId,
        ],
        set: { statementIndex },
      });
  }
}
