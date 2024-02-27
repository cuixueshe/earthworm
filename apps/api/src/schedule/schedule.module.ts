import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { RankService } from 'src/rank/rank.service';

@Module({
  providers: [ScheduleService, RankService],
})
export class ScheduleModule {}
