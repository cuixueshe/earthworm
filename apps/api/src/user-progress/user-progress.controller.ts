import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Put,
  Param,
} from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserProgressDto } from './model/update-user-progress.dto';

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
  @Put(':courseId')
  updateOne(@Request() req, @Param('courseId') courseId: number) {
    return this.userProgressService.update(+req.user.userId, +courseId);
  }
}
