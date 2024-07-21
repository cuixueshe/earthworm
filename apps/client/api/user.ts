import type { SetupUserApiResponse, User, UserApiResponse } from "~/types";
import { fetchUserInfo } from "~/services/auth";
import { http } from "./http";

export async function fetchSetupNewUser(data: { username: string; avatar: string }) {
  return await http.post<SetupUserApiResponse, SetupUserApiResponse>("/user/setup", data);
}

export async function fetchCurrentUser() {
  // 这里必须在 client 获取 user info
  // 他会触发 token 的刷新
  const logtoUserInfo = await fetchUserInfo();
  const extraInfo = await http.get<UserApiResponse, UserApiResponse>("/user");

  return {
    ...logtoUserInfo,
    ...extraInfo,
    avatar: logtoUserInfo!.picture || "", // 添加 avatar 字段，默认值为 picture （ picture 这个属性不够清晰 不喜欢）
  } as User;
}
