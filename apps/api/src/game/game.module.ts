import { Module, forwardRef } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GlobalModule } from '../global/global.module';
import { UserProgressModule } from '../user-progress/user-progress.module';
import { CourseModule } from '../course/course.module';
import { CourseHistoryModule } from '../course-history/course-history.module';
import { RankService } from '../rank/rank.service';

@Module({
  imports: [
    GlobalModule,
    forwardRef(() => CourseModule),
    UserProgressModule,
    CourseHistoryModule,
  ],
  providers: [GameService, RankService],
  controllers: [GameController],
  exports: [GameService],
})
export class GameModule {}
