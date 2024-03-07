import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { CourseHistoryService } from './course-history.service';
import { AuthGuard } from '../auth/auth.guard';
import { User, UserEntity } from '../user/user.decorators';

@Controller('course-history')
export class CourseHistoryController {
  constructor(private readonly courseHistoryService: CourseHistoryService) {}

  @UseGuards(AuthGuard)
  @Get('')
  courseCompletionCount() {
    return this.courseHistoryService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('course-progress')
  async courseProgress(@User() user: UserEntity, @Body() body) {
    return await this.courseHistoryService.setCourseProgress(
      user,
      body.courseId,
      body.progress,
    );
  }
}
