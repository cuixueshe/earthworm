import { Injectable, Inject } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { courseHistory } from '@earthworm/shared';
import { eq, and } from 'drizzle-orm';

@Injectable()
export class CourseHistoryService {
  constructor(@Inject(DB) private db: DbType) {}

  async create(userId: number, courseId: number) {
    await this.db.insert(courseHistory).values({
      courseId,
      userId,
      completionCount: 1,
    });
  }

  async update(userId: number, courseId: number, count: number) {
    await this.db
      .update(courseHistory)
      .set({
        completionCount: count + 1,
      })
      .where(
        and(
          eq(courseHistory.userId, userId),
          eq(courseHistory.courseId, courseId),
        ),
      );
  }

  async find(userId: number, courseId: number) {
    const result = await this.db
      .select()
      .from(courseHistory)
      .where(
        and(
          eq(courseHistory.userId, userId),
          eq(courseHistory.courseId, courseId),
        ),
      );

    if (result && result.length) {
      // find it
      this.update(userId, courseId, result[0].completionCount);
    } else {
      // not find
      this.create(userId, courseId);
    }
  }

  async findCompletionCount() {
    return await this.db
      .select({
        courseId: courseHistory.courseId,
        completionCount: courseHistory.completionCount,
      })
      .from(courseHistory);
  }
}
