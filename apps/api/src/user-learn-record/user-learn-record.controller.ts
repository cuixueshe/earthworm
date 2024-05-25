import { Controller, Get, Query, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../guards/auth.guard";
import { User, UserEntity } from "../user/user.decorators";
import { GetUserLearnRecordDto } from "./model/user-learn-record.dto";
import { UserLearnRecordService } from "./user-learn-record.service";

@Controller("user-learn-record")
export class UserLearnRecordController {
  constructor(private userLearnRecordService: UserLearnRecordService) {}

  @Get("finishCount")
  finishCount(@Query("userId") userId: string, @Query() dto?: GetUserLearnRecordDto) {
    return this.userLearnRecordService.find(userId, dto);
  }
}
