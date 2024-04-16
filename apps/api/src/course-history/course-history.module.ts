import { Module } from "@nestjs/common";

import { CourseHistoryController } from "./course-history.controller";
import { CourseHistoryService } from "./course-history.service";

@Module({
  controllers: [CourseHistoryController],
  providers: [CourseHistoryService],
  exports: [CourseHistoryService],
})
export class CourseHistoryModule {}
