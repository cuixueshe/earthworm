import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AchievementController } from './achievement.controller';
import { AchieveService } from './achievement.service';
@Module({
  imports: [UserModule],
  controllers: [AchievementController],
  providers: [AchieveService],
})
export class AchievementModule {}
