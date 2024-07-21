import { type UserInfoResponse } from "@logto/vue";

import { type UserApiResponse } from "../api/user";

export type User = UserInfoResponse &
  UserApiResponse & {
    avatar: string;
  };
