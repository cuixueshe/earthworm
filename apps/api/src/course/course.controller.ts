import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { User, UserEntity } from '../user/user.decorators';
import { CourseService } from './course.service';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @ApiOperation({
    summary: '游客体验的接口',
  })
  @Get('try')
  tryCourse() {
    // 专门让游客体验的接口 不需要做 auth 验证
    return this.courseService.tryCourse();
  }

  @ApiOperation({
    summary: '根据课程ID返回课程内容',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':courseId')
  findOne(@Param('courseId') courseId: number) {
    return this.courseService.find(courseId);
  }

  @ApiOperation({
    summary: '获取所有课程的信息',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('')
  findAll() {
    return this.courseService.findAll();
  }

  @ApiOperation({
    summary: '查找指定课程ID（courseId）之后的下一个课程，并返回该课程的信息',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':courseId/next')
  findNext(@Param('courseId') courseId: number) {
    return this.courseService.findNext(courseId);
  }

  @ApiOperation({
    summary: '完成指定课程，更新课程进度，完成次数，排行榜，返回下一课内容',
  })
  @ApiBearerAuth()
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
