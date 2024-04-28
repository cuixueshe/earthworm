import { Inject, Injectable } from "@nestjs/common";
import { and, asc, desc, eq } from "drizzle-orm";

import { coursePack, userCourseProgress } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";

@Injectable()
export class UserCourseProgressService {
  constructor(@Inject(DB) private db: DbType) {}

  async findStatement(userId: string, coursePackId: number, courseId: number) {
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
    const userCourseProgressResult = await this.db
      .selectDistinctOn([userCourseProgress.coursePackId], {
        id: userCourseProgress.id,
        coursePackId: userCourseProgress.coursePackId,
        courseId: userCourseProgress.courseId,
        title: coursePack.title,
        description: coursePack.description,
      })
      .from(userCourseProgress)
      .where(eq(userCourseProgress.userId, userId))
      .orderBy(asc(userCourseProgress.coursePackId), desc(userCourseProgress.updatedAt))
      .limit(limit)
      .leftJoin(coursePack, eq(userCourseProgress.coursePackId, coursePack.id));

    return userCourseProgressResult;
  }

  async upsert(userId: string, coursePackId: number, courseId: number, statementIndex: number) {
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
