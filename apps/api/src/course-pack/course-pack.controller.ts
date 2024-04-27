import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

import { AuthGuard, UncheckAuth } from "../guards/auth.guard";
import { CoursePacksAccessGuard } from "../guards/course-packs-access.guard";
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

  @UncheckAuth()
  @UseGuards(AuthGuard, CoursePacksAccessGuard)
  @Get(":coursePackId")
  async findOne(@User() user: UserEntity, @Param("coursePackId") coursePackId: string) {
    return await this.coursePackService.findOneWithCourses(user.userId, coursePackId);
  }

  @UncheckAuth()
  @UseGuards(AuthGuard, CoursePacksAccessGuard)
  @Get(":coursePackId/courses/:courseId")
  findCourse(
    @User() user: UserEntity,
    @Param("coursePackId", ParseIntPipe) coursePackId: string,
    @Param("courseId", ParseIntPipe) courseId: string,
  ) {
    return this.coursePackService.findCourse(user.userId, coursePackId, courseId);
  }

  @UncheckAuth()
  @UseGuards(AuthGuard, CoursePacksAccessGuard)
  @Get(":coursePackId/courses/:courseId/next")
  findNextCourse(
    @Param("coursePackId", ParseIntPipe) coursePackId: string,
    @Param("courseId", ParseIntPipe) courseId: string,
  ) {
    return this.coursePackService.findNextCourse(coursePackId, courseId);
  }

  @UncheckAuth()
  @UseGuards(AuthGuard, CoursePacksAccessGuard)
  @Post(":coursePackId/courses/:courseId/complete")
  CompleteCourse(
    @User() user: UserEntity,
    @Param("coursePackId") coursePackId: string,
    @Param("courseId") courseId: string,
  ) {
    return this.coursePackService.completeCourse(user.userId, coursePackId, courseId);
  }

  // TODO 暂时不支持用户自行上传课程包
  // @UseGuards(AuthGuard)
  // @Post()
  // create(@Body() createCoursePackDto: CreateCoursePackDto) {
  //   return this.coursePackService.create(createCoursePackDto);
  // }
}
