import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { User, UserEntity } from '../user/user.decorators';
import { CourseHistoryService } from './course-history.service';

@Controller('course-history')
export class CourseHistoryController {
  constructor(private readonly courseHistoryService: CourseHistoryService) {}

  @UseGuards(AuthGuard)
  @Get('')
  courseCompletionCount(@User() user: UserEntity) {
    return this.courseHistoryService.findAll(user);
  }

  @UseGuards(AuthGuard)
  @Post('updateProgress')
  courseProgress(@User() user: UserEntity, @Body() body) {
    return this.courseHistoryService.setProgress(
      user.userId,
      body.courseId,
      body.currentIndex,
    );
  }

  @UseGuards(AuthGuard)
  @Get('progress/:courseId')
  currentCourseHistory(@User() user: UserEntity, @Param('courseId') courseId) {
    return this.courseHistoryService.getCourseProgress(user.userId, courseId);
  }
}
