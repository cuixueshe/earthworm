import { type UserInfoResponse } from "@logto/vue";

import { http } from "./http";

export async function updateUserinfo(datas: Partial<UserInfoResponse>) {
  return await http.patch<UserInfoResponse | undefined, UserInfoResponse | undefined>(
    "/user",
    datas,
  );
}

export async function fetchUserSetup(data: { username: string; avatar: string }) {
  return await http.post("/user/setup", data);
}
