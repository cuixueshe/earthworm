import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { User, UserEntity } from '../user/user.decorators';
import { CourseHistoryService } from './course-history.service';

@ApiBearerAuth()
@ApiTags('CourseHistory')
@Controller('course-history')
export class CourseHistoryController {
  constructor(private readonly courseHistoryService: CourseHistoryService) {}

  @ApiOperation({
    summary: '获取登陆用户的所有课程历史记录',
  })
  @UseGuards(AuthGuard)
  @Get('')
  courseCompletionCount(@User() user: UserEntity) {
    return this.courseHistoryService.findAll(user);
  }
}
