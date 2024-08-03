import type { MembershipType, SetupUser, User } from "~/types";
import { fetchUserInfo } from "~/services/auth";
import { getHttp } from "./http";

export interface SetupUserApiResponse {
  avatar: string;
  username: string;
}

export interface UserApiResponse {
  membership: {
    details: {
      endDate: string;
      type: MembershipType;
      startDate: string;
    } | null;
    isMember: boolean;
  };
}

export async function fetchSetupNewUser(data: { username: string; avatar: string }) {
  const http = getHttp();
  return (await http<SetupUserApiResponse>("/user/setup", {
    method: "post",
    body: data,
  })) as SetupUser;
}

export async function fetchCurrentUser() {
  const http = getHttp();
  // 这里必须在 client 获取 user info
  // 他会触发 token 的刷新
  const logtoUserInfo = await fetchUserInfo();
  const extraInfo = await http<UserApiResponse>("/user", { method: "get" });

  return {
    ...logtoUserInfo,
    ...extraInfo,
    avatar: logtoUserInfo!.picture || "", // 添加 avatar 字段，默认值为 picture （ picture 这个属性不够清晰 不喜欢）
    id: logtoUserInfo!.sub || "", // logto 把 user 唯一 id  叫做 sub ， 不喜欢
  } as User;
}
