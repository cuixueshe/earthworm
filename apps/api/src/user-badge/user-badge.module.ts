import { Module } from "@nestjs/common";

import { UserBadgeController } from "./user-badge.controller";
import { UserBadgeService } from "./user-badge.service";

@Module({
  controllers: [UserBadgeController],
  providers: [UserBadgeService],
  exports: [UserBadgeService],
})
export class UserBadgeModule {}
