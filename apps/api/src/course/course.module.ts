import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { UserProgressService } from '../user-progress/user-progress.service';
import { RankService } from '../rank/rank.service';

@Module({
  providers: [CourseService, UserProgressService, RankService],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule {}
