import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthGuard } from '../auth/auth.guard';
import { User, UserEntity } from '../user/user.decorators';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get(':courseId')
  findOne(@Param('courseId') courseId: number) {
    return this.courseService.find(courseId);
  }

  @Get('')
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':courseId/next')
  findNext(@Param('courseId') courseId: number) {
    return this.courseService.findNext(courseId);
  }

  @UseGuards(AuthGuard)
  @Post(':courseId/complete')
  async completeCourse(
    @User() user: UserEntity,
    @Param('courseId') courseId: number,
  ) {
    const result = await this.courseService.completeCourse(user, courseId);
    return result;
  }
}
