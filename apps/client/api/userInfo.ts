import { type UserInfoResponse } from "@logto/vue";

import { http } from "./http";

export async function updateUsername(name: string) {
  return await http.patch<UserInfoResponse, UserInfoResponse>("/user/info/updatename", {
    name: name,
  });
}
