import { Inject, Injectable } from "@nestjs/common";
import { and, asc, eq } from "drizzle-orm";

import { userCourseProgress } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";

@Injectable()
export class UserCourseProgressService {
  constructor(@Inject(DB) private db: DbType) {}

  async findAllByUserId(userId: string) {
    return await this.db.query.userCourseProgress.findMany({
      where: eq(userCourseProgress.userId, userId),
      with: {
        orderBy: [asc(userCourseProgress.updatedAt)],
      },
    });
  }

  async findStatement(userId: string, coursePackId: number, courseId: number) {
    const result = await this.db.query.userCourseProgress.findFirst({
      where: and(
        eq(userCourseProgress.userId, userId),
        eq(userCourseProgress.coursePackId, coursePackId),
        eq(userCourseProgress.courseId, courseId),
      ),
    });

    return result.statementIndex;
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
