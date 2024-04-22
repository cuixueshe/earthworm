import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../guards/auth.guard";
import { User, UserEntity } from "../user/user.decorators";
import { UpsertUserProgressDto } from "./model/user-progress.dto";
import { UserCourseProgressService } from "./user-course-progress.service";

@ApiBearerAuth()
@ApiTags("UserProgress")
@Controller("user-progress")
export class UserProgressController {
  constructor(private readonly userCourseProgressService: UserCourseProgressService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAllCourses(@User() user: UserEntity) {
    const allCourseProgress = await this.userCourseProgressService.findAllByUserId(user.userId);
    return allCourseProgress;
  }

  @UseGuards(AuthGuard)
  @Get("course-pack/:coursePackId")
  async findCoursePackInfo(@User() user: UserEntity, @Param("coursePackId") coursePackId: string) {
    // 2. 可以只有 course pack id  来返回 当前 course pack 的所有信息
    // const coursePackInfo = await this.userProgressService.findCoursePackInfo(coursePackId);
    // return coursePackInfo;
  }

  @UseGuards(AuthGuard)
  @Get(":userId/course-pack/:coursePackId/course/:courseId")
  async findCourseProgress(
    @User() user: UserEntity,
    @Param("userId") userId: string,
    @Param("coursePackId") coursePackId: string,
    @Param("courseId") courseId: string,
  ) {
    // 3. 如果 user id course pack id 和 course id 都有的话 那么就返回这个 course id 的具体进度
    // const courseProgress = await this.userProgressService.findCourseProgress(
    //   userId,
    //   coursePackId,
    //   courseId,
    // );
    // return courseProgress;
  }

  @UseGuards(AuthGuard)
  @Put()
  async upsert(@User() user: UserEntity, @Body() dto: UpsertUserProgressDto) {
    const result = await this.userCourseProgressService.upsert(
      user.userId,
      Number(dto.coursePackId),
      Number(dto.courseId),
      dto.statementIndex,
    );

    return result;
  }
}
