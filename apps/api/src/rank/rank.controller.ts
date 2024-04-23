import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import type { RankPeriodAlias } from "./rank.service";
import { AuthGuard, UncheckAuth } from "../guards/auth.guard";
import { User, UserEntity } from "../user/user.decorators";
import { RankPeriod, RankService } from "./rank.service";

@ApiBearerAuth()
@ApiTags("Rank")
@Controller("rank")
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @ApiOperation({
    summary: "获取排行榜信息",
  })
  @UncheckAuth()
  @UseGuards(AuthGuard)
  @Get("progress/:period")
  getRankList(
    @User() user: UserEntity,
    @Param("period") period: RankPeriodAlias = RankPeriod.WEEKLY,
  ) {
    return this.rankService.getRankList(user, period);
  }
}
