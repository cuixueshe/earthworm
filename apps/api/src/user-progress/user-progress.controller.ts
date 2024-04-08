import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { User, UserEntity } from '../user/user.decorators';
import {
  CreateUserProgressDto,
  UpdateUserProgressDto,
} from './model/user-progress.dto';
import { UserProgressService } from './user-progress.service';

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
    return this.userProgressService.update(+user.userId, +dto.courseId);
  }
}
