import { Module } from "@nestjs/common";

import { LogtoModule } from "../logto/logto.module";
import { UserCourseProgressModule } from "../user-course-progress/user-course-progress.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [LogtoModule, UserCourseProgressModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
