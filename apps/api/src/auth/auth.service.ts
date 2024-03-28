import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignDto } from './model/auth.dto';
import * as argon2 from 'argon2';
import { CreateUserDto } from '../user/model/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: SignDto) {
    let user = await this.userService.findWithUsername(dto.username);

    if (!user) {
      user = await this.userService.findWithPhone({ phone: dto.phone });
    }

    if (!user) {
      throw new HttpException('User not exists', HttpStatus.BAD_REQUEST);
    }

    if (!(await argon2.verify(user.password, dto.password))) {
      throw new UnauthorizedException();
    }

    const payload = {
      userId: user.id,
      username: user.username,
      nickname: user.nickname,
      phone: user.phone,
    };

    return {
      token: await this.jwtService.signAsync(payload),
      user: payload,
    };
  }

  async signup(dto: CreateUserDto) {
    let user = null;

    user = await this.userService.findWithUsername(dto.username);

    if (!user) {
      user = await this.userService.findWithPhone({ phone: dto.phone });
    }

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const res = await this.userService.createUser(dto);

    const payload = {
      userId: res.id,
      username: dto.username,
      nickname: dto.nickname,
    };
    return {
      token: await this.jwtService.signAsync(payload),
      user: {
        ...payload,
        phone: dto.phone,
      },
    };
  }
}
