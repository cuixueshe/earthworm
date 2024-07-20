import type { SetupUserApiResponse, UserApiResponse } from "~/types";
import { http } from "./http";

export async function fetchSetupNewUser(data: { username: string; avatar: string }) {
  return await http.post<SetupUserApiResponse, SetupUserApiResponse>("/user/setup", data);
}

export async function fetchCurrentUser() {
  return await http.get<UserApiResponse, UserApiResponse>("/user");
}
