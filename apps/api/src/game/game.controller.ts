import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { User, UserEntity } from '../user/user.decorators';
import { GameService } from './game.service';

@ApiBearerAuth()
@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @ApiOperation({
    summary: '开始游戏',
    description:
      '检查用户的学习进度，如果用户尚未开始学习课程，则将其与第一个课程关联，并返回课程ID；如果用户已经开始学习课程，则返回用户上次学习的课程ID。',
  })
  @UseGuards(AuthGuard)
  @Post('/start')
  async startGame(@User() user: UserEntity) {
    return await this.gameService.startGame(user);
  }
}
