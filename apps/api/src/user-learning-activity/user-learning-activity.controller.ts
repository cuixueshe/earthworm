import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../guards/auth.guard";
import { User, UserEntity } from "../user/user.decorators";
import { QueryParamsDto } from "./model/query-params.dto";
import { UpsertActivityDto } from "./model/upsert-activity.dto";
import { UserLearningActivityService } from "./user-learning-activity.service";

@Controller("user-learning-activities")
export class UserLearningActivityController {
  constructor(private userLearningActivityService: UserLearningActivityService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getDailyTotals(@User() user: UserEntity, @Query() queryParams: QueryParamsDto) {
    const { activityType, startDate, endDate } = queryParams;
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.userLearningActivityService.getDailyTotalTime(
      user.userId,
      activityType,
      start,
      end,
    );
  }

  @UseGuards(AuthGuard)
  @Post()
  async upsertActivity(@User() user: UserEntity, @Body() activityData: UpsertActivityDto) {
    const result = await this.userLearningActivityService.upsertActivity(
      user.userId,
      new Date(activityData.date),
      activityData.activityType,
      activityData.duration,
    );

    return result;
  }

  @UseGuards(AuthGuard)
  @Get("total")
  async getTotalLearningTime(@User() user: UserEntity, @Query() queryParams: QueryParamsDto) {
    const { activityType, startDate, endDate } = queryParams;
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const totalTime = await this.userLearningActivityService.getTotalLearningTime(
      user.userId,
      activityType,
      start,
      end,
    );

    return totalTime;
  }
}
