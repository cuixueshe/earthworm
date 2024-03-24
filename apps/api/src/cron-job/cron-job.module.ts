import { Module } from '@nestjs/common';
import { RankService } from '../rank/rank.service';
import { CronJobService } from './cron-job.service';

@Module({
  providers: [CronJobService, RankService],
})
export class CronJobModule {}
