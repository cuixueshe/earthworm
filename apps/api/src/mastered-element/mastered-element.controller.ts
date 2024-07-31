import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../guards/auth.guard";
import { User, UserEntity } from "../user/user.decorators";
import { MasteredElementService } from "./mastered-element.service";
import { AddMasteredElementDto } from "./model/add-mastered-element.dto";
import { RemoveMasteredElementDto } from "./model/remove-mastered-element.dto";

@Controller("mastered-elements")
export class MasteredElementController {
  constructor(private readonly masteredElementService: MasteredElementService) {}

  @UseGuards(AuthGuard)
  @Post()
  async addMasteredElement(
    @User() user: UserEntity,
    @Body() addMasteredElementDto: AddMasteredElementDto,
  ) {
    return await this.masteredElementService.addMasteredElement(
      user.userId,
      addMasteredElementDto.content,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async getMasteredElements(@User() user: UserEntity) {
    return this.masteredElementService.getMasteredElements(user.userId);
  }

  @UseGuards(AuthGuard)
  @Delete(":elementId")
  async removeMasteredElement(
    @User() user: UserEntity,
    @Param() removeMasteredElementDto: RemoveMasteredElementDto,
  ) {
    return await this.masteredElementService.removeMasteredElement(
      user.userId,
      removeMasteredElementDto.elementId,
    );
  }
}
