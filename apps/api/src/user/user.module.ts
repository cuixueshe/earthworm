import { Module } from "@nestjs/common";

import { LogtoModule } from "../logto/logto.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [LogtoModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
