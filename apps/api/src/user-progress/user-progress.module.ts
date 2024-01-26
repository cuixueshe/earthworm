import { Module } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { UserProgressController } from './user-progress.controller';

@Module({
  controllers: [UserProgressController],
  providers: [UserProgressService],
})
export class UserProgressModule {}
