import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';

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
}
