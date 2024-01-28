import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GlobalModule } from 'src/global/global.mudule';
import { UserProgressModule } from 'src/user-progress/user-progress.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [GlobalModule, CourseModule, UserProgressModule],
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
