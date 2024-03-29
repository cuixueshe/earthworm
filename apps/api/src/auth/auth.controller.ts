import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpException,
} from '@nestjs/common';
import { SignDto } from './model/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from '../user/model/user.dto';
import { UserEntity, User } from '../user/user.decorators';

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
