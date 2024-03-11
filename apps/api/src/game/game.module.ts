import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GlobalModule } from '../global/global.module';
import { UserProgressModule } from '../user-progress/user-progress.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [GlobalModule, CourseModule, UserProgressModule],
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
