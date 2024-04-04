import { Body, Controller, Get, Post } from '@nestjs/common';
import { AchieveService } from './achievement.service';
import {
  FindUserDto,
  UserAchievementDto,
  publishAchievementDto,
  setAchievementDto,
} from './model/pub.dto';
@Controller('achievement')
export class AchievementController {
  constructor(private readonly AchieveService: AchieveService) {}

  // @UseGuards(PubAchievementGuard)
  @Post('/publish')
  async publishAchievement(@Body() dto: publishAchievementDto) {
    return this.AchieveService.PubAchievement(dto);
  }
  // @UseGuards(AuthGuard)
  @Get('/list')
  async allAchievement() {
    return this.AchieveService.AllAchievement();
  }

  @Get('/authUser')
  async authUser(@Body() dto: FindUserDto) {
    return this.AchieveService.authUser(dto);
  }
  // @UseGuards(AuthGuard)
  @Post('/set')
  async setAchievement(@Body() dto: setAchievementDto) {
    return this.AchieveService.setAchievement(dto);
  }
  // @UseGuards(AuthGuard)
  @Post('/use')
  async useAchievement(@Body() dto: UserAchievementDto) {
    return this.AchieveService.useAchievement(dto);
  }
}
