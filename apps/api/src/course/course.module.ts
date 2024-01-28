import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { GlobalModule } from '../global/global.mudule';
import { UserProgressService } from '../user-progress/user-progress.service';
import { RankService } from '../rank/rank.service';

@Module({
  imports: [GlobalModule],
  providers: [CourseService, UserProgressService, RankService],
  controllers: [CourseController],
})
export class CourseModule {}
