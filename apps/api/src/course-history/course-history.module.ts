import { Module, forwardRef } from '@nestjs/common';
import { CourseHistoryService } from './course-history.service';
import { CourseHistoryController } from './course-history.controller';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [forwardRef(() => CourseModule)],
  controllers: [CourseHistoryController],
  providers: [CourseHistoryService],
  exports: [CourseHistoryService],
})
export class CourseHistoryModule {}
