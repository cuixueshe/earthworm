import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get(':courseId')
  getStatements(@Param('courseId') courseId: number) {
    return this.courseService.find(courseId);
  }
}
