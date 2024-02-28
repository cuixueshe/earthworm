import { Module } from '@nestjs/common';
import { CronJobService } from './cron-job.service';
import { RankService } from '../rank/rank.service';

@Module({
  providers: [CronJobService, RankService],
})
export class CronJobModule {}
