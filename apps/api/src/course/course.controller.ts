import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { User, UserEntity } from '../user/user.decorators';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get('try')
  tryCourse() {
    // 专门让游客体验的接口 不需要做 auth 验证
    return this.courseService.tryCourse();
  }

  @UseGuards(AuthGuard)
  @Get(':courseId')
  findOne(@Param('courseId') courseId: number) {
    return this.courseService.find(courseId);
  }

  @UseGuards(AuthGuard)
  @Get('')
  findAll() {
    return this.courseService.findAll();
  }

  @UseGuards(AuthGuard)
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
    console.log('result', result);

    return result;
  }
}
