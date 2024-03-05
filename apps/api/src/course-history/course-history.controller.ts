import { Controller, Get, UseGuards } from '@nestjs/common';
import { CourseHistoryService } from './course-history.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('course-history')
export class CourseHistoryController {
  constructor(private readonly courseHistoryService: CourseHistoryService) {}

  @UseGuards(AuthGuard)
  @Get('count')
  courseCompletionCount() {
    return this.courseHistoryService.findCompletionCount();
  }
}
