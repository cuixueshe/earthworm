import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserLearnRecordService } from './user-learn-record.service';
import { User, UserEntity } from '../user/user.decorators';
import { AuthGuard } from '../auth/auth.guard';
import { GetUserLearnRecordDto } from './model/user-learn-record.dto';

@Controller('user-learn-record')
export class UserLearnRecordController {
  constructor(private userLearnRecordService: UserLearnRecordService) {}

  @UseGuards(AuthGuard)
  @Get('finishCount')
  finishCount(@User() user: UserEntity, @Query() dto?: GetUserLearnRecordDto) {
    return this.userLearnRecordService.findUserLearnRecord(user.userId, dto);
  }
}
