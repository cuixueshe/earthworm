import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { RankService } from '../rank/rank.service';

@Module({
  providers: [ScheduleService, RankService],
})
export class ScheduleModule {}
