import { Body, Controller, Patch, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../auth/auth.guard";
import { User, UserEntity } from "../user/user.decorators";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Patch("changeUsername")
  async changeUsername(@User() user: UserEntity, @Body("username") username: string) {
    const res = await this.userService.changeUsername(user, username);
    return res;
  }
}
