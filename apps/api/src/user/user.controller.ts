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

  // 给新用户第一次登录使用
  // 目前使用 email 和 github 登录的用户 都不存在 username
  // 所以这个接口有两个目的
  // 1. 设置 username
  // 2. 默认添加星荣的课程包到最近的课程包
  @UseGuards(AuthGuard)
  @Post("setup")
  async initializeUser(@User() user: UserEntity, @Body() dto: UpdateUserDto) {
    return this.userService.setup(user, dto);
  }

  @Get("custom-data")
  @UseGuards(AuthGuard)
  async getUserCustomData(@User() user: UserEntity) {
    return this.userService.getUserCustomData(user.userId);
  }

  @Patch("custom-data")
  @UseGuards(AuthGuard)
  async updateUserCustomData(
    @User() user: UserEntity,
    @Body() customData: Record<PropertyKey, any>,
  ) {
    return this.userService.updateUserCustomData(user.userId, customData);
  }
}
