import { Module } from '@nestjs/common';
import { UserLearnRecordController } from './user-learn-record.controller';
import { UserLearnRecordService } from './user-learn-record.service';

@Module({
  controllers: [UserLearnRecordController],
  providers: [UserLearnRecordService],
  exports: [UserLearnRecordService],
})
export class UserLearnRecordModule {}
