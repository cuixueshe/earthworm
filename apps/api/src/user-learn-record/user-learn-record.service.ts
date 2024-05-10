import { Inject, Injectable } from "@nestjs/common";
import { and, eq, gte, lte, sql } from "drizzle-orm";

import { userLearnRecord } from "@earthworm/schema";
import type { DbType } from "../global/providers/db.provider";
import { DB } from "../global/providers/db.provider";
import { GetUserLearnRecordDto } from "./model/user-learn-record.dto";

@Injectable()
export class UserLearnRecordService {
  constructor(@Inject(DB) private db: DbType) {}

  async upsert(userId: string, day: Date = new Date()) {
    const dayStr = day.toISOString().split("T")[0];

    await this.db
      .insert(userLearnRecord)
      .values({
        userId,
        day: dayStr,
        count: 1,
      })
      .onConflictDoUpdate({
        target: [userLearnRecord.userId, userLearnRecord.day],
        set: {
          count: sql`user_learn_record.count + 1`,
        },
      });
  }

  async find(userId: string, dto?: GetUserLearnRecordDto) {
    const { startDate, endDate } = dto;

    const conditions = [];

    if (startDate) {
      conditions.push(gte(userLearnRecord.day, startDate));
    }

    if (endDate) {
      conditions.push(lte(userLearnRecord.day, endDate));
    }

    conditions.push(eq(userLearnRecord.userId, userId));

    const result = await this.db.query.userLearnRecord.findMany({
      columns: {
        day: true,
        count: true,
      },
      where: and(...conditions),
    });

    return {
      totalCount: result.reduce((prev, cur) => prev + cur.count, 0),
      list: result,
    };
  }
}
