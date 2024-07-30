import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard, CheckAdminWithUserId } from "src/guards/auth.guard";

import { BadgeService } from "./badge.service";
import { CreateBadgeDto } from "./dto/create-badge.dto";
import { SearchBadgeDto } from "./dto/find-badge-condition.dto";

@CheckAdminWithUserId()
@UseGuards(AuthGuard)
@Controller("/admin/badges")
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get("/search")
  findByCondition(
    @Body()
    condition: SearchBadgeDto,
  ) {
    return this.badgeService.findAllByCondition(condition);
  }

  @Post("/add")
  add(
    @Body()
    dto: CreateBadgeDto,
  ) {
    return this.badgeService.add(dto);
  }
}
