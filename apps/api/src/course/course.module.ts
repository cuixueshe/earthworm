import { Module } from "@nestjs/common";

import { CourseHistoryService } from "../course-history/course-history.service";
import { GlobalModule } from "../global/global.module";
import { MembershipModule } from "../membership/membership.module";
import { RankService } from "../rank/rank.service";
import { UserCourseProgressService } from "../user-course-progress/user-course-progress.service";
import { UserLearnRecordService } from "../user-learn-record/user-learn-record.service";
import { UserModule } from "../user/user.module";
import { CourseService } from "./course.service";

@Module({
  imports: [GlobalModule, UserModule, MembershipModule],
  providers: [
    CourseService,
    UserCourseProgressService,
    RankService,
    CourseHistoryService,
    UserLearnRecordService,
  ],
  controllers: [],
  exports: [CourseService],
})
export class CourseModule {}
