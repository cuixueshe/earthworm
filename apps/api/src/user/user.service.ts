import { Inject, Injectable } from "@nestjs/common";

import { DB, DbType } from "../global/providers/db.provider";
import { logtoApi } from "../services/logtoService";
import { UserEntity } from "../user/user.decorators";
import { UserInfo } from "./user.controller";

@Injectable()
export class UserService {
  constructor(@Inject(DB) private db: DbType) {}

  async getUser(uId: string) {
    try {
      const { data } = await logtoApi.get(`/api/users/${uId}`);
      return data;
    } catch (error) {
      return undefined;
    }
  }
  async updateUser(user: UserEntity, userInfo: UserInfo) {
    try {
      const { data } = await logtoApi.patch(`/api/users/${user.userId}`, userInfo);
      return { data };
    } catch (error) {
      return undefined;
    }
  }
}
