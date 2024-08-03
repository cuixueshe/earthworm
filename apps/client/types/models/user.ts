import { type UserInfoResponse } from "@logto/vue";

import type { SetupUserApiResponse } from "~/api/user";
import { type UserApiResponse } from "~/api/user";

export interface SetupUser extends SetupUserApiResponse {}

export type User = UserInfoResponse &
  UserApiResponse & {
    avatar: string;
    id: string;
  };
