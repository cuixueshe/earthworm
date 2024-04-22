import { Module } from "@nestjs/common";

import { UserProgressController } from "./user-course-progress.controller";
import { UserCourseProgressService } from "./user-course-progress.service";

@Module({
  controllers: [UserProgressController],
  providers: [UserCourseProgressService],
  exports: [UserCourseProgressService],
})
export class UserCourseProgressModule {}
