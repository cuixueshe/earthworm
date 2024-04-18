import { Body, Controller, Param, Patch } from "@nestjs/common";

import { UserService } from "./user.service";

export type IUserInfo = {
  username: string;
};
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch("updatePersonalInfo/:userId")
  updatePersonalInfo(@Param("userId") id: string, @Body() updateInfo: IUserInfo) {
    return this.userService.updateUser(id, updateInfo);
  }
}
