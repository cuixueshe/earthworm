import { Module } from "@nestjs/common";

import { CourseModule } from "../course/course.module";
import { MembershipModule } from "../membership/membership.module";
import { CoursePackController } from "./course-pack.controller";
import { CoursePackService } from "./course-pack.service";

@Module({
  imports: [CourseModule, MembershipModule],
  providers: [CoursePackService],
  controllers: [CoursePackController],
})
export class CoursePackModule {}
