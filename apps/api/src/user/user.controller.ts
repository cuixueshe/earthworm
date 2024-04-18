import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../auth/auth.guard";
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
}
