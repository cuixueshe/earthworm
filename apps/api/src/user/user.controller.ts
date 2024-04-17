import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../auth/auth.guard";
import { User, UserEntity } from "../user/user.decorators";
import { UserService } from "./user.service";

export interface UserInfo {
  name: string;
}
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard)
  @Get("info/updatename")
  updateName(@User() user: UserEntity, @Query() userInfo: UserInfo) {
    return this.userService.updateUser(user, userInfo);
  }
}
