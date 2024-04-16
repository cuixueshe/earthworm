import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Body, UseGuards, Get, Put } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserProgressDto } from './model/user-progress.dto';
import { User, UserEntity } from '../user/user.decorators';

@ApiBearerAuth()
@ApiTags('UserProgress')
@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  @ApiOperation({
    summary: '生成当前登陆用户的课程完成进度',
  })
  @UseGuards(AuthGuard)
  @Get()
  findOne(@User() user: UserEntity) {
    return this.userProgressService.findOne(user.userId);
  }

  @ApiOperation({
    summary: '更新当前登陆用户的课程完成进度',
  })
  @UseGuards(AuthGuard)
  @Put()
  async updateOne(
    @User() user: UserEntity,
    @Body() dto: UpdateUserProgressDto,
  ) {
    const result = await this.userProgressService.update(
      user.userId,
      +dto.courseId,
    );

    return result;
  }
}
