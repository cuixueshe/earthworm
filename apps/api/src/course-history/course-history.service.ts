import { courseHistory } from '@earthworm/schema';
import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { UserEntity } from 'src/user/user.decorators';
import { DB, DbType } from '../global/providers/db.provider';

@Injectable()
export class CourseHistoryService {
  constructor(@Inject(DB) private db: DbType) {}

  async findOne(userId: number, courseId: number) {
    return await this.db
      .select()
      .from(courseHistory)
      .where(
        and(
          eq(courseHistory.userId, userId),
          eq(courseHistory.courseId, courseId),
        ),
      );
  }

  async create(
    userId: number,
    courseId: number,
    type: 'completionCount' | 'progress' = 'completionCount',
  ) {
    const courseHistoryItem = {
      courseId,
      userId,
      completionCount: type === 'completionCount' ? 1 : 0,
      progress: 0, // 初始化的时候设置当前课程进度为0
    };
    await this.db.insert(courseHistory).values(courseHistoryItem);

    return courseHistoryItem;
  }

  async getCourseProgress(userId: number, courseId: number) {
    const result = await this.findOne(userId, courseId);
    if (result && result.length) {
      return result.length ? result[result.length - 1] : null;
    } else {
      return await this.create(userId, courseId, 'progress');
    }
  }

  async updateProgress(userId: number, courseId: number, progress: number) {
    await this.db
      .update(courseHistory)
      .set({
        progress: progress,
      })
      .where(
        and(
          eq(courseHistory.userId, userId),
          eq(courseHistory.courseId, courseId),
        ),
      );
  }

  async setProgress(userId: number, courseId: number, progress: number) {
    const result = await this.findOne(userId, courseId);
    if (result && result.length) {
      this.updateProgress(userId, courseId, progress);
    } else {
      this.create(userId, courseId, 'progress');
    }
  }

  async updateCompletionCount(userId: number, courseId: number, count: number) {
    await this.db
      .update(courseHistory)
      .set({
        completionCount: count + 1,
        progress: 0, // 课程完成次数加一，表示进度已经全部未完成，重置课程进度为0
      })
      .where(
        and(
          eq(courseHistory.userId, userId),
          eq(courseHistory.courseId, courseId),
        ),
      );
  }

  async setCompletionCount(userId: number, courseId: number) {
    const result = await this.findOne(userId, courseId);
    if (result && result.length) {
      this.updateCompletionCount(userId, courseId, result[0].completionCount);
    } else {
      this.create(userId, courseId);
    }
  }

  async findAll(user: UserEntity) {
    return await this.db
      .select()
      .from(courseHistory)
      .where(eq(courseHistory.userId, user.userId));
  }
}
