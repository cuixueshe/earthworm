import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../user/model/user.dto';
import { User, UserEntity } from '../user/user.decorators';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignDto } from './model/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '登陆接口',
  })
  @ApiBody({ type: SignDto, description: '登陆信息' })
  @Post('login')
  login(@Body() dto: SignDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({
    summary: '注册接口',
  })
  @ApiBody({ type: CreateUserDto, description: '注册信息' })
  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @ApiOperation({
    summary: '获取用户信息接口',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: '2XX',
    description: '用户基本信息',
  })
  @UseGuards(AuthGuard)
  @Get('userInfo')
  userInfo(@User() user: UserEntity) {
    return user;
  }
}
