import { Test, TestingModule } from '@nestjs/testing';
import { sql } from 'drizzle-orm';
import { createUser } from '../../../test/fixture/user';
import {
  createEmptyUserLearnRecordList,
  createUserLearnRecordList,
} from '../../../test/fixture/userLearnRecord';
import {
  cleanDB,
  endDB,
  startDB,
  testImportModules,
} from '../../../test/helper/utils';
import { DB, DbType } from '../../global/providers/db.provider';
import { UserLearnRecordService } from '../user-learn-record.service';

const user = createUser();
const emptyUserLearnRecordList = createEmptyUserLearnRecordList();
const UserLearnRecordList = createUserLearnRecordList();

describe('user learn record service', () => {
  let db: DbType;
  let userLearnRecordService: UserLearnRecordService;

  beforeAll(async () => {
    const testHelper = await setupTesting();

    db = testHelper.db;
    userLearnRecordService = testHelper.userLearnRecordService;
  });

  afterAll(async () => {
    await cleanDB(db);
    await endDB(db);
  });

  beforeEach(async () => {
    await db.execute(sql`TRUNCATE TABLE \`user-learn-record\`;`);
    await startDB(db);
  });

  describe('utils', () => {
    it('should return the date of 52 weeks forward', async () => {
      const res = userLearnRecordService.calcStartDate(new Date('2024-03-11'));

      expect(res.toISOString().slice(0, 10)).toBe('2023-03-12');
    });

    it('should return the start and end of the date range', async () => {
      const date = new Date('2024-01-01');
      let { start, end } = userLearnRecordService.dateRange(date);
      function convertToUTC(date: Date) {
        const offset = date.getTimezoneOffset();
        const utcDate = new Date(date.getTime() - offset * 60 * 1000);
        return utcDate;
      }

      start = convertToUTC(start);
      end = convertToUTC(end);

      expect(start.toISOString()).toBe('2024-01-01T00:00:00.000Z');
      expect(end.toISOString()).toBe('2024-01-01T23:59:59.999Z');
    });
  });

  describe('user learn record', () => {
    it('should create a record', async () => {
      const date = new Date('2023-03-29');

      await userLearnRecordService.create(user.userId, date);

      const res = await userLearnRecordService.findOne(user.userId, date);

      expect(res.userId).toBe(user.userId);
      expect(res.date.toISOString().slice(0, 10)).toBe('2023-03-29');
      expect(res.count).toBe(1);
    });

    it('should update count of record', async () => {
      const date = new Date('2023-05-14');
      const count = 7;
      await userLearnRecordService.create(user.userId, date);

      await userLearnRecordService.update(user.userId, date, count);

      const res = await userLearnRecordService.findOne(user.userId, date);
      expect(res.count).toBe(count + 1);
    });

    it('should create a record when the user completes a course.', async () => {
      const date = new Date('2023-05-16');
      const fn = jest.spyOn(userLearnRecordService, 'create');

      await userLearnRecordService.userLearnRecord(user.userId, date);

      expect(fn).toHaveBeenCalledWith(user.userId, date);
    });

    it('should update count of record when the user completes multiple course on the same day.', async () => {
      const date = new Date('2023-05-18');
      const count = 2;
      const fn = jest.spyOn(userLearnRecordService, 'update');

      await userLearnRecordService.userLearnRecord(user.userId, date);
      await userLearnRecordService.userLearnRecord(user.userId, date);
      await userLearnRecordService.userLearnRecord(user.userId, date);

      expect(fn).toHaveBeenCalledWith(user.userId, date, count);
    });

    it('should return an empty list when the user has completed a course but it does not fall within the query range.', async () => {
      const date = new Date('2024-01-01');
      await userLearnRecordService.userLearnRecord(user.userId, date);

      const query = { startDate: '2023-01-01', endDate: '2023-12-31' };
      const res = await userLearnRecordService.findUserLearnRecord(
        user.userId,
        query,
      );

      expect(res).toEqual(emptyUserLearnRecordList);
    });

    it('should return a list of records when the user has completed a course and it falls within the query range.', async () => {
      const date = new Date('2024-01-01');
      await userLearnRecordService.userLearnRecord(user.userId, date);

      const query = { startDate: '2024-01-01', endDate: '2024-12-31' };
      const res = await userLearnRecordService.findUserLearnRecord(
        user.userId,
        query,
      );

      expect(res).toEqual(UserLearnRecordList);
    });
  });
});

async function setupTesting() {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: testImportModules,
    providers: [UserLearnRecordService],
  }).compile();
  return {
    db: moduleRef.get<DbType>(DB),
    userLearnRecordService: moduleRef.get<UserLearnRecordService>(
      UserLearnRecordService,
    ),
  };
}
