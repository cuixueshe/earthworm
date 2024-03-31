import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard, UncheckAuth } from '../auth/auth.guard';
import { User, UserEntity } from '../user/user.decorators';
import type { RankPeriodAlias } from './rank.service';
import { RankPeriod, RankService } from './rank.service';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @UncheckAuth()
  @UseGuards(AuthGuard)
  @Get('progress/:period')
  getRankList(
    @User() user: UserEntity,
    @Param('period') period: RankPeriodAlias = RankPeriod.WEEKLY,
  ) {
    return this.rankService.getRankList(user, period);
  }
}
