import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";

import { User, UserEntity } from "../user/user.decorators";
import { CoursePackService } from "./course-pack.service";
import { CreateCoursePackDto } from "./dto/create-course-pack.dto";

@Controller("course-pack")
export class CoursePackController {
  constructor(private readonly coursePackService: CoursePackService) {}
  @Get()
  async findAll() {
    return await this.coursePackService.findAll();
  }

  @Get(":coursePackId")
  async findOne(@Param("coursePackId") coursePackId: number) {
    return await this.coursePackService.findOne(coursePackId);
  }

  @Get(":coursePackId/courses/:courseId")
  findCourse(
    @Param("coursePackId", ParseIntPipe) coursePackId: number,
    @Param("courseId", ParseIntPipe) courseId: number,
  ) {
    return this.coursePackService.findCourse(coursePackId, courseId);
  }

  @Get(":coursePackId/courses/:courseId/next")
  findNextCourse(
    @Param("coursePackId", ParseIntPipe) coursePackId: number,
    @Param("courseId", ParseIntPipe) courseId: number,
  ) {
    return this.coursePackService.findNextCourse(coursePackId, courseId);
  }

  @Post(":coursePackId/courses/:courseId/complete")
  CompleteCourse(
    @User() user: UserEntity,
    @Param("coursePackId", ParseIntPipe) coursePackId: number,
    @Param("courseId", ParseIntPipe) courseId: number,
  ) {
    return this.coursePackService.completeCourse(user, coursePackId, courseId);
  }

  @Post()
  create(@Body() createCoursePackDto: CreateCoursePackDto) {
    return this.coursePackService.create(createCoursePackDto);
  }
}
