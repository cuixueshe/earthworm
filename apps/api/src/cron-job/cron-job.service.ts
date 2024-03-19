import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RankPeriod, RankService } from '../rank/rank.service';

@Injectable()
export class CronJobService {
  private static readonly EVERY_MONDAY_AT_2AM = '0 2 * * 1';
  private static readonly EVERY_FIRST_DAY_OF_MONTH_AT_2AM = '0 2 1 * *';
  private static readonly EVERY_FIRST_DAY_OF_YEAR_AT_2AM = '0 2 1 1 *';

  constructor(private readonly rankService: RankService) {}

  @Cron(CronJobService.EVERY_MONDAY_AT_2AM)
  async resetRankListWeekly() {
    this.rankService.resetRankList(RankPeriod.WEEKLY);
  }
  @Cron(CronJobService.EVERY_FIRST_DAY_OF_MONTH_AT_2AM)
  async resetRankListMonthly() {
    this.rankService.resetRankList(RankPeriod.MONTHLY);
  }
  @Cron(CronJobService.EVERY_FIRST_DAY_OF_YEAR_AT_2AM)
  async resetRankListYearly() {
    this.rankService.resetRankList(RankPeriod.YEARLY);
  }
}
