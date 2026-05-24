import { Body, Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../guards/auth.guard";
import { User, UserEntity } from "../user/user.decorators";
import { UpdateUserDto } from "./model/user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard)
  @Patch()
  updateInfo(@User() user: UserEntity, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(user, dto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getCurrentUser(@User() user: UserEntity) {
    const userInfo = await this.userService.findCurrentUser(user.userId);
    return userInfo;
  }

  // For new users on first login
  // Currently users who login with email and github don't have a username
  // So this endpoint serves two purposes:
  // 1. Set username
  // 2. Add default course pack to recent course packs
  @UseGuards(AuthGuard)
  @Post("setup")
  async initializeUser(@User() user: UserEntity, @Body() dto: UpdateUserDto) {
    return this.userService.setupNewUser(user, dto);
  }
}
