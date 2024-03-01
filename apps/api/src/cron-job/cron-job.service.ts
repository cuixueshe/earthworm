import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RankService } from '../rank/rank.service';

@Injectable()
export class CronJobService {
  private static readonly EVERY_MONDAY_AT_2AM = '0 2 * * 1';

  constructor(private readonly rankService: RankService) {}

  @Cron(CronJobService.EVERY_MONDAY_AT_2AM)
  async resetRankList() {
    this.rankService.resetRankList();
  }
}
