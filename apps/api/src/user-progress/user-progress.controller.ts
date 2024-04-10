import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { User, UserEntity } from '../user/user.decorators';
import {
  CreateUserProgressDto,
  UpdateUserProgressDto,
} from './model/user-progress.dto';
import { UserProgressService } from './user-progress.service';

@ApiBearerAuth()
@ApiTags('UserProgress')
@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  @ApiOperation({
    summary: '生成当前登陆用户的课程完成进度',
  })
  @UseGuards(AuthGuard)
  @Post()
  create(@User() user: UserEntity, @Body() body: CreateUserProgressDto) {
    return this.userProgressService.create(+user.userId, body.courseId);
  }

  @ApiOperation({
    summary: '查找当前登陆用户的课程完成进度',
  })
  @UseGuards(AuthGuard)
  @Get()
  findOne(@User() user: UserEntity) {
    return this.userProgressService.findOne(+user.userId);
  }

  @ApiOperation({
    summary: '更新当前登陆用户的课程完成进度',
  })
  @UseGuards(AuthGuard)
  @Put()
  updateOne(@User() user: UserEntity, @Body() dto: UpdateUserProgressDto) {
    return this.userProgressService.update(+user.userId, +dto.courseId);
  }
}
