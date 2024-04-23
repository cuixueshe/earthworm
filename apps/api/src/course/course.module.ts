import { Module } from "@nestjs/common";

import { CourseHistoryService } from "../course-history/course-history.service";
import { GlobalModule } from "../global/global.module";
import { MembershipModule } from "../membership/membership.module";
import { RankService } from "../rank/rank.service";
import { UserLearnRecordService } from "../user-learn-record/user-learn-record.service";
import { UserProgressService } from "../user-progress/user-progress.service";
import { UserModule } from "../user/user.module";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";

@Module({
  imports: [GlobalModule, UserModule, MembershipModule],
  providers: [
    CourseService,
    UserProgressService,
    RankService,
    CourseHistoryService,
    UserLearnRecordService,
  ],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule {}
