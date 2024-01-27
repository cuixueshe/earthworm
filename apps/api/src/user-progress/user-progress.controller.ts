import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Put,
} from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { AuthGuard } from '../auth/auth.guard';
import {
  CreateUserProgressDto,
  UpdateUserProgressDto,
} from './model/user-progress.dto';
import { User, UserEntity } from '../user/user.decorators';

@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() body: CreateUserProgressDto) {
    return this.userProgressService.create(+req.user.userId, body.courseId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findOne(@Request() req) {
    return this.userProgressService.findOne(+req.user.userId);
  }

  @UseGuards(AuthGuard)
  @Put()
  updateOne(@User() user: UserEntity, @Body() dto: UpdateUserProgressDto) {
    return this.userProgressService.update(
      +user.userId,
      +dto.courseId,
      user.username,
    );
  }
}
