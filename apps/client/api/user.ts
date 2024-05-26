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

export async function getUserCustomData() {
  return await http.get<Record<PropertyKey, any>>("/user/custom-data");
}

export async function updateUserCustomData(data: Record<PropertyKey, any>) {
  return await http.patch<Record<PropertyKey, any>, Record<PropertyKey, any>>(
    "/user/custom-data",
    data,
  );
}
