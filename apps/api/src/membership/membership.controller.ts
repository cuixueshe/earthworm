import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";

import { AuthGuard, Permissions } from "../guards/auth.guard";
import { BuyMembershipDto } from "./dto/buy-membership.dto";
import { MembershipService } from "./membership.service";

@Controller("membership")
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Permissions("write:membership")
  @UseGuards(AuthGuard)
  @Post("buy")
  async buyMembership(@Body() buyMembershipDto: BuyMembershipDto) {
    return await this.membershipService.upsert(new Date(), buyMembershipDto);
  }
}
