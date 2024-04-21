import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { userProgress } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";

@Injectable()
export class UserProgressService {
  constructor(@Inject(DB) private db: DbType) {}

  private async create(userId: string, courseId: number) {
    await this.db.insert(userProgress).values({
      courseId,
      userId,
    });

    return {
      courseId,
    };
  }

  async findOne(userId: string) {
    const res = await this.db.select().from(userProgress).where(eq(userProgress.userId, userId));

    return {
      courseId: res.length ? res[res.length - 1].courseId : null,
    };
  }

  async upsert(userId: string, courseId: number) {
    const { courseId: isExist } = await this.findOne(userId);

    if (!isExist) {
      await this.create(userId, courseId);
    } else {
      await this.db.update(userProgress).set({ courseId }).where(eq(userProgress.userId, userId));
    }

    return {
      courseId,
    };
  }
}
