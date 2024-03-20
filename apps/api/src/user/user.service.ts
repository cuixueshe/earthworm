import { user } from '@earthworm/schema';
import { Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { DB, DbType } from '../global/providers/db.provider';
import { CreateUserDto, FindUserDto } from './model/user.dto';

@Injectable()
export class UserService {
  constructor(@Inject(DB) private db: DbType) {}

  async createUser(dto: CreateUserDto) {
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
