import { Module } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { UserProgressController } from './user-progress.controller';
import { RankService } from '../rank/rank.service';

@Module({
  controllers: [UserProgressController],
  providers: [UserProgressService, RankService],
})
export class UserProgressModule {}
