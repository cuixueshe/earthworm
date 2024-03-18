import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RankService } from '../rank/rank.service';

@Injectable()
export class CronJobService {
  private static readonly EVERY_MONDAY_AT_2AM = '0 2 * * 1';
  private static readonly TIME_ZONE = 'Asia/Shanghai';

  constructor(private readonly rankService: RankService) {}

  @Cron(CronJobService.EVERY_MONDAY_AT_2AM, {
    timeZone: CronJobService.TIME_ZONE,
  })
  async resetRankList() {
    this.rankService.resetRankList();
  }
}
