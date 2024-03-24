import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, UncheckAuth } from '../auth/auth.guard';
import { User, UserEntity } from '../user/user.decorators';
import { RankService } from './rank.service';

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
