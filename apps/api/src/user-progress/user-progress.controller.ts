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
  create(@User() user: UserEntity, @Body() body: CreateUserProgressDto) {
    return this.userProgressService.create(+user.userId, body.courseId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findOne(@User() user: UserEntity) {
    return this.userProgressService.findOne(+user.userId);
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
