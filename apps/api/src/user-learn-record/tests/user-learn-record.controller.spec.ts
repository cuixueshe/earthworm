import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { createUser } from '../../../test/fixture/user';
import {
  createEmptyUserLearnRecordList,
  createUserLearnRecordList,
} from '../../../test/fixture/userLearnRecord';
import { UserLearnRecordController } from '../user-learn-record.controller';
import { UserLearnRecordService } from '../user-learn-record.service';

const user = createUser();

const emptyUserLearnRecordList = createEmptyUserLearnRecordList();
const UserLearnRecordList = createUserLearnRecordList();

describe('user finish count controller', () => {
  let userLearnRecordController: UserLearnRecordController;
  let userLearnRecordService: UserLearnRecordService;

  beforeEach(async () => {
    const testHelper = await setupTesting();

    userLearnRecordService = testHelper.userLearnRecordService;
    userLearnRecordController = testHelper.userLearnRecordController;
  });

  it('should return an empty list when the current user has not completed any course.', async () => {
    const result = emptyUserLearnRecordList;
    jest
      .spyOn(userLearnRecordService, 'findUserLearnRecord')
      .mockImplementation(async () => result);

    const res = await userLearnRecordController.finishCount(user);
    expect(res).toBe(result);
    expect(userLearnRecordService.findUserLearnRecord).toHaveBeenCalled();
  });

  it('should return a list of records when the current user has completed a course.', async () => {
    const result = UserLearnRecordList;
    jest
      .spyOn(userLearnRecordService, 'findUserLearnRecord')
      .mockImplementation(async () => result);

    const res = await userLearnRecordController.finishCount(user);
    expect(res).toBe(result);
    expect(userLearnRecordService.findUserLearnRecord).toHaveBeenCalled();
  });
});

async function setupTesting() {
  const mockUserLearnRecordService = {
    findUserLearnRecord: jest.fn(() => {
      return UserLearnRecordList;
    }),
  };

  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [
      JwtModule.register({
        secret: process.env.SECRET,
        signOptions: { expiresIn: '7d' },
      }),
    ],
    controllers: [UserLearnRecordController],
    providers: [
      {
        provide: UserLearnRecordService,
        useValue: mockUserLearnRecordService,
      },
    ],
  }).compile();
  return {
    userLearnRecordController: moduleRef.get<UserLearnRecordController>(
      UserLearnRecordController,
    ),
    userLearnRecordService: moduleRef.get<UserLearnRecordService>(
      UserLearnRecordService,
    ),
  };
}
