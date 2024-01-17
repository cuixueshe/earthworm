import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './model/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
