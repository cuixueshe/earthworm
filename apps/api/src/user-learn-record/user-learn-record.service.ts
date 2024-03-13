import { Inject, Injectable } from '@nestjs/common';
import { userLearnRecord } from '@earthworm/shared';
import { type DbType, DB } from '../global/providers/db.provider';
import { and, count, eq, gte, lte, sql } from 'drizzle-orm';
import { GetUserLearnRecordDto } from './model/user-learn-record.dto';

@Injectable()
export class UserLearnRecordService {
  constructor(@Inject(DB) private db: DbType) {}

  async userLearnRecord(userId: number, courseId: number, createdAt?: Date) {
    await this.db.insert(userLearnRecord).values({
      courseId,
      userId,
      createdAt,
    });
  }

  calcStartDate(date: Date = new Date()) {
    const offset = 52 * 7 + (date.getDay() % 7);
    const startDay = date.getDate() - offset;
    return new Date(date.setDate(startDay));
  }

  async findUserLearnRecord(userId: number, dto?: GetUserLearnRecordDto) {
    const { startDate, endDate } = dto;
    let start = startDate ? new Date(startDate) : this.calcStartDate();
    let end = endDate ? new Date(endDate) : new Date();

    start = new Date(start.setHours(0, 0, 0, 0));
    end = new Date(end.setHours(23, 59, 59, 999));

    const result = await this.db
      .select({
        date: sql`DATE(${userLearnRecord.createdAt})`,
        count: count(userLearnRecord.id),
      })
      .from(userLearnRecord)
      .where(
        and(
          lte(userLearnRecord.createdAt, end),
          gte(userLearnRecord.createdAt, start),
          eq(userLearnRecord.userId, userId),
        ),
      )
      .groupBy(sql`DATE(${userLearnRecord.createdAt})`)
      .orderBy(sql`DATE(${userLearnRecord.createdAt})`);

    return {
      totalCount: result.reduce((prev, cur) => prev + cur.count, 0),
      list: result,
    };
  }
}
