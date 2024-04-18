import { type UserInfoResponse } from "@logto/vue";

import { http } from "./http";

export async function updateUserinfo(datas: Omit<Partial<UserInfoResponse>, "username">) {
  return await http.patch<UserInfoResponse, UserInfoResponse>("/user/info/updateinfo", datas);
}
