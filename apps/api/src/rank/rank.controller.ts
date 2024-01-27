import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { RankService } from './rank.service';
import { User, UserEntity } from '../user/user.decorators';
import { AuthGuard, UncheckAuth } from '../auth/auth.guard';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @UncheckAuth()
  @UseGuards(AuthGuard)
  @Get('progress')
  getRankList(@User() user: UserEntity) {
    return this.rankService.getRankList(user);
  }
}
