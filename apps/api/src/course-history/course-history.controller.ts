import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../guards/auth.guard";
import { CourseHistoryService } from "./course-history.service";

@ApiBearerAuth()
@ApiTags("CourseHistory")
@Controller("course-history")
export class CourseHistoryController {
  constructor(private readonly courseHistoryService: CourseHistoryService) {}

  @ApiOperation({
    summary: "获取登陆用户的所有课程历史记录",
  })
  @UseGuards(AuthGuard)
  @Get("")
  courseCompletionCount(@Param("userId") userId: string) {
    return this.courseHistoryService.findAll(userId);
  }
}
