import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { GlobalModule } from '../global/global.module';
import { UserProgressService } from '../user-progress/user-progress.service';
import { RankService } from '../rank/rank.service';
import { CourseHistoryService } from '../course-history/course-history.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [GlobalModule, UserModule],
  providers: [
    CourseService,
    UserProgressService,
    RankService,
    CourseHistoryService,
  ],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule {}
