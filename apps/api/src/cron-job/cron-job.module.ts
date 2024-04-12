import { Module } from '@nestjs/common';
import { CronJobService } from './cron-job.service';
import { RankService } from '../rank/rank.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [CronJobService, RankService],
})
export class CronJobModule {}
