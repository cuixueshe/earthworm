import { Module } from '@nestjs/common';
import { CourseHistoryService } from './course-history.service';
import { CourseHistoryController } from './course-history.controller';

@Module({
  controllers: [CourseHistoryController],
  providers: [CourseHistoryService],
  exports: [CourseHistoryService],
})
export class CourseHistoryModule {}
