import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { courseHistory } from '@earthworm/shared';
import { eq, and } from 'drizzle-orm';
import { UserEntity } from 'src/user/user.decorators';
import { CourseService } from '../course/course.service';

@Injectable()
export class CourseHistoryService {
  constructor(
    @Inject(DB) private db: DbType,
    @Inject(forwardRef(() => CourseService))
    private readonly courseService: CourseService,
  ) {}

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

  async create(userId: number, courseId: number) {
    await this.db.insert(courseHistory).values({
      courseId,
      userId,
      completionCount: 1,
      progress: '', // 完成一课之后进度重置
    });
  }

  async updateCompletionCount(userId: number, courseId: number, count: number) {
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

  async setCourseProgress(
    user: UserEntity,
    courseId: number,
    courseIndex: number,
  ) {
    const total = await this.courseService.findAll();
    let ratio = courseIndex / total.length;
    // 如果是0，认定该节课已完成
    if (ratio == 0) {
      ratio = 1;
    }
    const progress = `${parseFloat((ratio * 100).toFixed(2))}%`;
    const result = await this.findOne(user.userId, courseId);
    if (result && result.length) {
      await this.db
        .update(courseHistory)
        .set({
          progress,
        })
        .where(
          and(
            eq(courseHistory.userId, user.userId),
            eq(courseHistory.courseId, courseId),
          ),
        );
    } else {
      await this.db.insert(courseHistory).values({
        courseId,
        userId: user.userId,
        progress,
      });
    }

    return { ...result[0], progress };
  }
}
