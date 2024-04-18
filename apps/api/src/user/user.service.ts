import { Inject, Injectable } from "@nestjs/common";

import type { IUserInfo } from "./user.controller";
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

  async updateUser(uId: string, user: IUserInfo) {
    try {
      await logtoApi.patch(`/api/users/${uId}`, user);
      return true;
    } catch (error) {
      return false;
    }
  }
}
