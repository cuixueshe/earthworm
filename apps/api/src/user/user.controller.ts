import { Body, Controller, Patch, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../auth/auth.guard";
import { User, UserEntity } from "../user/user.decorators";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard)
  @Patch("info/updatename")
  updateName(@User() user: UserEntity, @Body("name") userInfo: string) {
    return this.userService.updateUser(user, userInfo);
  }
}
