import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards
} from '@nestjs/common';
import { CreateUserDto } from '../user/model/user.dto';
import { User, UserEntity } from '../user/user.decorators';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignDto } from './model/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: SignDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @UseGuards(AuthGuard)
  @Get('userInfo')
  userInfo(@User() user: UserEntity) {
    return user;
  }
}
