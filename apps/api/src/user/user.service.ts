import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "src/user/user.decorators";

import { DB, DbType } from "../global/providers/db.provider";
import { logtoApi } from "../services/logtoService";

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
  // change username
  async changeUsername(user: UserEntity, newUsername: string) {
    const uId = user.userId;
    try {
      await logtoApi.patch(`/api/users/${uId}`, {
        username: newUsername,
      });
      return true;
    } catch (error) {
      return error.response.data;
    }
  }
}
