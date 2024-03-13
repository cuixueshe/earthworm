import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { DbType, DB } from '../../global/providers/db.provider';
import { UserLearnRecordService } from '../user-learn-record.service';
import { GlobalModule } from '../../global/global.mudule';
import {
  createEmptyUserLearnRecordList,
  createUserLearnRecordList,
} from '../../../test/fixture/userLearnRecord';
import { createUser } from '../../../test/fixture/user';

const user = createUser();
const emptyUserLearnRecordList = createEmptyUserLearnRecordList();
const UserLearnRecordList = createUserLearnRecordList();

describe('user finish count service', () => {
  let db: DbType;
  let userLearnRecordService: UserLearnRecordService;

  beforeEach(async () => {
    const testHelper = await setupTesting();

    db = testHelper.db;
    userLearnRecordService = testHelper.userLearnRecordService;
  });

  describe('user finish count', () => {
    const courseId = 1;
    const date = new Date(2024, 0, 1);

    it('should return date of 52 weeks forward', async () => {
      await userLearnRecordService.userLearnRecord(user.userId, courseId, date);

      const res = userLearnRecordService.calcStartDate(new Date('2024-03-11'));

      expect(res.toISOString().slice(0, 10)).toBe('2023-03-12');
    });

    it('should return an empty list when the current user has completed a course but it does not fall within the query range.', async () => {
      await userLearnRecordService.userLearnRecord(user.userId, courseId, date);
      const query = { startDate: '2023-01-01', endDate: '2023-12-31' };

      const res = await userLearnRecordService.findUserLearnRecord(
        user.userId,
        query,
      );

      expect(res).toEqual(emptyUserLearnRecordList);
    });

    it('should return a list of records when the current user has completed a course and it falls within the query range.', async () => {
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
    imports: [
      GlobalModule,
      JwtModule.register({
        secret: process.env.SECRET,
        signOptions: { expiresIn: '7d' },
      }),
    ],
    providers: [UserLearnRecordService],
  }).compile();
  return {
    db: moduleRef.get<DbType>(DB),
    userLearnRecordService: moduleRef.get<UserLearnRecordService>(
      UserLearnRecordService,
    ),
  };
}
