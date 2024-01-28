import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User, UserEntity } from 'src/user/user.decorators';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(AuthGuard)
  @Post('/start')
  async startGame(@User() user: UserEntity) {
    return await this.gameService.startGame(user);
  }
}
