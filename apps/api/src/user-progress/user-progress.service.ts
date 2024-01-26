import { Injectable, Inject } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { userProgress } from '@earthwrom/shared';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserProgressService {
  constructor(@Inject(DB) private db: DbType) {}

  async create(userId: number, courseId: number) {
    await this.db.insert(userProgress).values({
      courseId,
      userId,
    });

    return {
      courseId,
    };
  }

  async findOne(userId: number) {
    const res = await this.db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId));

    return {
      courseId: res.length ? res[0].courseId : null,
    };
  }

  async update(userId: number, courseId: number) {
    await this.db
      .update(userProgress)
      .set({ courseId })
      .where(eq(userProgress.userId, userId));
    return {
      courseId,
    };
  }
}
