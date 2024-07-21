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

  // 给新用户第一次登录使用
  // 目前使用 email 和 github 登录的用户 都不存在 username
  // 所以这个接口有两个目的
  // 1. 设置 username
  // 2. 默认添加星荣的课程包到最近的课程包
  @UseGuards(AuthGuard)
  @Post("setup")
  async initializeUser(@User() user: UserEntity, @Body() dto: UpdateUserDto) {
    return this.userService.setupNewUser(user, dto);
  }
}
