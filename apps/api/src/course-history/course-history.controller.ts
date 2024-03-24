import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { User, UserEntity } from '../user/user.decorators';
import { CourseHistoryService } from './course-history.service';

@Controller('course-history')
export class CourseHistoryController {
  constructor(private readonly courseHistoryService: CourseHistoryService) {}

  @UseGuards(AuthGuard)
  @Get('')
  courseCompletionCount(@User() user: UserEntity) {
    return this.courseHistoryService.findAll(user);
  }
}
