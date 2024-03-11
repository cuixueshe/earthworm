import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GlobalModule } from '../global/global.mudule';
import { UserProgressModule } from '../user-progress/user-progress.module';
import { CourseModule } from '../course/course.module';
import { RankService } from '../rank/rank.service';
import { CourseHistoryService } from '../course-history/course-history.service';

@Module({
  imports: [GlobalModule, CourseModule, UserProgressModule],
  providers: [GameService, RankService, CourseHistoryService],
  controllers: [GameController],
})
export class GameModule {}
