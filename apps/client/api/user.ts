import { type UserInfoResponse } from "@logto/vue";

import { http } from "./http";

export async function updateUserinfo(data: Partial<UserInfoResponse>) {
  return await http.patch<UserInfoResponse | undefined, UserInfoResponse | undefined>(
    "/user",
    data,
  );
}

export async function fetchUserSetup(data: { username: string; avatar: string }) {
  return await http.post("/user/setup", data);
}
