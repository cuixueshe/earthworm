import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, FindUserDto } from './model/user.dto';
import { DB, DbType } from '../global/providers/db.provider';
import { user } from '@earthworm/shared';
import { eq } from 'drizzle-orm';
import * as argon2 from 'argon2';
import { Validator } from 'class-validator';

@Injectable()
export class UserService {
  constructor(@Inject(DB) private db: DbType) {}

  async createUser(dto: CreateUserDto) {
    const oldUser = await this.findWithPhone(dto);
    if (oldUser) throw new HttpException('User already exists', 400);
    const [res] = await this.db.insert(user).values({
      ...dto,
      password: await argon2.hash(dto.password),
    });
    return {
      id: res.insertId,
    };
  }

  async findWithPhone(dto: FindUserDto) {
    return this.db.query.user.findFirst({
      where: eq(user.phone, dto.phone),
    });
  }
}
