import { Module } from "@nestjs/common";

import { BadgeController } from "./badge.controller";
import { BadgeService } from "./badge.service";

@Module({
  controllers: [BadgeController],
  providers: [BadgeService],
  exports: [BadgeService],
})
export class BadgeModule {}
