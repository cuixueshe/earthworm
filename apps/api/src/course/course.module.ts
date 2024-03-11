import { Module, forwardRef } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { GlobalModule } from '../global/global.module';
import { GameModule } from '../game/game.module';

@Module({
  imports: [GlobalModule, forwardRef(() => GameModule)],
  providers: [CourseService],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule {}
