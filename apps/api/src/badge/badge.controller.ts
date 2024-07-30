import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../guards/auth.guard";
import { BadgeService } from "./badge.service";
import { BadgeType } from "./interface";

@ApiBearerAuth()
@ApiTags("badge")
@Controller("badge")
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @UseGuards(AuthGuard)
  @Get("/find")
  findEnable() {
    return this.badgeService.findEnable();
  }

  @UseGuards(AuthGuard)
  @Get("/findByType")
  findEnableByType(@Query("type") type: BadgeType) {
    return this.badgeService.findEnableByType(type);
  }
}
