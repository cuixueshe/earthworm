import { Inject, Injectable } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import { UserEntity } from "src/user/user.decorators";

import { courseHistory } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";

@Injectable()
export class CourseHistoryService {
  constructor(@Inject(DB) private db: DbType) {}

  async findOne(userId: string, courseId: number) {
    return await this.db
      .select()
      .from(courseHistory)
      .where(and(eq(courseHistory.userId, userId), eq(courseHistory.courseId, courseId)));
  }

  async create(userId: string, courseId: number) {
    await this.db.insert(courseHistory).values({
      courseId,
      userId,
      completionCount: 1,
    });
  }

  async updateCompletionCount(userId: string, courseId: number, count: number) {
    await this.db
      .update(courseHistory)
      .set({
        completionCount: count + 1,
      })
      .where(and(eq(courseHistory.userId, userId), eq(courseHistory.courseId, courseId)));
  }

  async setCompletionCount(userId: string, courseId: number) {
    const result = await this.findOne(userId, courseId);
    if (result && result.length) {
      this.updateCompletionCount(userId, courseId, result[0].completionCount);
    } else {
      this.create(userId, courseId);
    }
  }

  async findAll(user: UserEntity) {
    return await this.db.select().from(courseHistory).where(eq(courseHistory.userId, user.userId));
  }
}
