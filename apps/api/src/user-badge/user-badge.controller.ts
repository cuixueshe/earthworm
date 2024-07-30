import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { User, UserEntity } from "src/user/user.decorators";

import { UserBadgeService } from "./user-badge.service";

@UseGuards(AuthGuard)
@Controller("user-badges")
export class UserBadgeController {
  constructor(private readonly userBadgeService: UserBadgeService) {}

  @Get("wearing")
  async findWearingOderByUpdatedAt(@User() user: UserEntity) {
    return this.userBadgeService.findWearingOderByUpdatedAt(user.userId);
  }

  @Get("all")
  async findAll(@User() user: UserEntity) {
    return this.userBadgeService.findAll(user.userId);
  }

  @Post("wear")
  async wearing(@User() user: UserEntity, @Param("badgeId") badgeId: string) {
    return this.userBadgeService.wearing(user.userId, badgeId);
  }

  @Post("unwear")
  async unWearing(@User() user: UserEntity, @Param("badgeId") badgeId: string) {
    return this.userBadgeService.unWearing(user.userId, badgeId);
  }

  @Post("to-top")
  async toTop(@User() user: UserEntity, @Param("badgeId") badgeId: string) {
    return this.userBadgeService.toTop(user.userId, badgeId);
  }

  @Post("read")
  async read(@User() user: UserEntity, @Param("badgeId") badgeId: string) {
    return this.userBadgeService.read(user.userId, badgeId);
  }

  @Get("find-unread")
  async findAllByUnread(@User() user: UserEntity) {
    return this.userBadgeService.findAllByUnread(user.userId);
  }
}
