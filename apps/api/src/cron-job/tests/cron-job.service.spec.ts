import { Test, TestingModule } from '@nestjs/testing';
import { RankService } from '../../rank/rank.service';
import { CronJobService } from '../cron-job.service';

describe('cron-job service', () => {
  let rankService: RankService;
  let cronJobService: CronJobService;
  beforeEach(async () => {
    const testHelper = await setupTesting();
    cronJobService = testHelper.cronJobService;
    rankService = testHelper.rankService;
  });

  it('should call the resetRankList method of RankService', async () => {
    jest.spyOn(rankService, 'resetRankList');

    await cronJobService.resetRankList();

    expect(rankService.resetRankList).toHaveBeenCalledTimes(1);
  });
});

async function setupTesting() {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [],
    providers: [
      CronJobService,
      {
        provide: RankService,
        useValue: {
          resetRankList: jest.fn(),
        },
      },
    ],
  }).compile();
  return {
    cronJobService: moduleRef.get<CronJobService>(CronJobService),
    rankService: moduleRef.get<RankService>(RankService),
  };
}
