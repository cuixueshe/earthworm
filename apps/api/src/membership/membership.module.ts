import { Module } from "@nestjs/common";

import { MembershipController } from "./membership.controller";
import { MembershipService } from "./membership.service";

@Module({
  imports: [],
  providers: [MembershipService],
  controllers: [MembershipController],
  exports: [MembershipService],
})
export class MembershipModule {}
