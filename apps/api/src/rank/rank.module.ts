import { Module } from '@nestjs/common';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';

@Module({
  controllers: [RankController],
  providers: [RankService],
})
export class RankModule {}
