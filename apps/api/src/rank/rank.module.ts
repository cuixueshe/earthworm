import { Module } from '@nestjs/common';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [RankController],
  providers: [RankService],
})
export class RankModule {}
