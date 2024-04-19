import { Inject, Injectable } from "@nestjs/common";

import { DB, DbType } from "../global/providers/db.provider";
import { LogtoService } from "../logto/logto.service";
import { UserEntity } from "../user/user.decorators";
import { UpdateUserDto } from "./model/user.dto";

@Injectable()
export class UserService {
  constructor(
    @Inject(DB) private db: DbType,
    private readonly logtoService: LogtoService,
  ) {}

  async findUser(uId: string) {
    try {
      const { data } = await this.logtoService.logtoApi.get(`/api/users/${uId}`);
      return data;
    } catch (error) {
      return undefined;
    }
  }
  async updateUser(user: UserEntity, dto: UpdateUserDto) {
    try {
      const { data } = await this.logtoService.logtoApi.patch(`/api/users/${user.userId}`, dto);
      return { data };
    } catch (error) {
      return undefined;
    }
  }
}
