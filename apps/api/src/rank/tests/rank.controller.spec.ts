import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createEmptyRankList,
  createRankListWithFirstUserFinishedCourse,
  createRankListWithUserFinishedCourse2Times,
} from '../../../test/fixture/rank';
import { createUser } from '../../../test/fixture/user';
import { MockRedisModule } from '../../../test/helper/mockRedis';
import { RankController } from '../rank.controller';
import { RankPeriod, RankService } from '../rank.service';

const user = createUser();
const emptyRankList = createEmptyRankList();
const firstUserFinished = createRankListWithFirstUserFinishedCourse();
const userFinishedTwice = createRankListWithUserFinishedCourse2Times();

describe('rank controller', () => {
  let rankController: RankController;
  let rankService: RankService;

  beforeEach(async () => {
    const testHelper = await setupTesting();

    rankService = testHelper.rankService;
    rankController = testHelper.rankController;
  });

  it('should return empty rank list', async () => {
    const result = emptyRankList;
    jest
      .spyOn(rankService, 'getRankList')
      .mockImplementation(async () => result);

    const res = await rankController.getRankList(user);
    expect(res).toBe(result);
    const resMonth = await rankController.getRankList(user, RankPeriod.MONTHLY);
    expect(resMonth).toBe(result);
    const resYear = await rankController.getRankList(user, RankPeriod.YEARLY);
    expect(resYear).toBe(result);
    expect(rankService.getRankList).toHaveBeenCalled();
  });

  it('should return rank list with first user finished course', async () => {
    const result = userFinishedTwice;
    jest
      .spyOn(rankService, 'getRankList')
      .mockImplementation(async () => result);

    const res = await rankController.getRankList(user);
    expect(res).toBe(result);
    const resMonth = await rankController.getRankList(user, RankPeriod.MONTHLY);
    expect(resMonth).toBe(result);
    const resYear = await rankController.getRankList(user, RankPeriod.YEARLY);
    expect(resYear).toBe(result);
    expect(rankService.getRankList).toHaveBeenCalled();
  });

  it('should return rank list with user finished course 2 times', async () => {
    const result = firstUserFinished;
    jest
      .spyOn(rankService, 'getRankList')
      .mockImplementation(async () => result);

    const res = await rankController.getRankList(user);
    expect(res).toBe(result);
    const resMonth = await rankController.getRankList(user, RankPeriod.MONTHLY);
    expect(resMonth).toBe(result);
    const resYear = await rankController.getRankList(user, RankPeriod.YEARLY);
    expect(resYear).toBe(result);

    expect(rankService.getRankList).toHaveBeenCalled();
  });
});

async function setupTesting() {
  const mockRankService = {
    getRankList: jest.fn(() => {
      return firstUserFinished;
    }),
  };

  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [
      MockRedisModule,
      JwtModule.register({
        secret: process.env.SECRET,
        signOptions: { expiresIn: '7d' },
      }),
    ],
    controllers: [RankController],
    providers: [
      {
        provide: RankService,
        useValue: mockRankService,
      },
    ],
  }).compile();
  return {
    rankController: moduleRef.get<RankController>(RankController),
    rankService: moduleRef.get<RankService>(RankService),
  };
}
