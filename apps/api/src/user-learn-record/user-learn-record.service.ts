import { userLearnRecord } from '@earthworm/schema';
import { Inject, Injectable } from '@nestjs/common';
import { and, eq, gte, lte, sql } from 'drizzle-orm';
import { DB, type DbType } from '../global/providers/db.provider';
import { GetUserLearnRecordDto } from './model/user-learn-record.dto';

@Injectable()
export class UserLearnRecordService {
  constructor(@Inject(DB) private db: DbType) {}

  async create(userId: string, date: Date) {
    await this.db.insert(userLearnRecord).values({
      userId,
      date,
      count: 1,
    });
  }

  dateRange(date: Date) {
    const start = new Date(new Date(date).setHours(0, 0, 0, 0));
    const end = new Date(new Date(date).setHours(23, 59, 59, 999));
    return { start, end };
  }

  async update(userId: string, date: Date, count: number) {
    const { start, end } = this.dateRange(date);

    await this.db
      .update(userLearnRecord)
      .set({
        count: count + 1,
      })
      .where(
        and(
          eq(userLearnRecord.userId, userId),
          lte(userLearnRecord.date, end),
          gte(userLearnRecord.date, start),
        ),
      );
  }

  async findOne(userId: string, date: Date) {
    const { start, end } = this.dateRange(date);

    const result = await this.db
      .select()
      .from(userLearnRecord)
      .where(
        and(
          eq(userLearnRecord.userId, userId),
          lte(userLearnRecord.date, end),
          gte(userLearnRecord.date, start),
        ),
      );
    return result[0];
  }

  calcStartDate(date: Date = new Date()) {
    const offset = 52 * 7 + (date.getDay() % 7);
    const startDay = date.getDate() - offset;
    return new Date(date.setDate(startDay));
  }

  async userLearnRecord(userId: string, date: Date = new Date()) {
    const record = await this.findOne(userId, date);
    if (record) {
      await this.update(userId, date, record.count);
    } else {
      await this.create(userId, date);
    }
  }

  async findUserLearnRecord(userId: string, dto?: GetUserLearnRecordDto) {
    const { startDate, endDate } = dto;
    let start = startDate ? new Date(startDate) : this.calcStartDate();
    let end = endDate ? new Date(endDate) : new Date();

    start = new Date(start.setHours(0, 0, 0, 0));
    end = new Date(end.setHours(23, 59, 59, 999));

    const result = await this.db
      .select({
        date: sql`DATE(${userLearnRecord.date})`,
        count: userLearnRecord.count,
      })
      .from(userLearnRecord)
      .where(
        and(
          lte(userLearnRecord.date, end),
          gte(userLearnRecord.date, start),
          eq(userLearnRecord.userId, userId),
        ),
      );

    return {
      totalCount: result.reduce((prev, cur) => prev + cur.count, 0),
      list: result,
    };
  }
}
