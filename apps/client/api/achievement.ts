import type { AchievementItem } from "~/composables/user/achievement";
import { http } from "./http";

interface PublishDto {
  secretKey: string;
  userID: number;
  choiceAchievement: number[];
}
interface UserDto {
  phone: string;
}
interface ss {
  name: string;
}
interface UserInfo {
  id: number;
  phone: string;
  name: string;
  password: string;
}
// 颁布成就
export async function fetchPubAchievement(dto: PublishDto) {
  return await http.post("/achievement/publish", dto);
}
// 获取成就列表
export async function fetchAllAchievements() {
  return await http.get<AchievementItem[], AchievementItem[]>("/achievement/list");
}
// 验证用户 check userID
export async function fetchAuthUser(dto: UserDto) {
    return await http.post<UserInfo, UserInfo>("/achievement/authUser", dto);
  // return await http.get("/achievement/authUser");
}
// 设置成就为使用中状态
export async function fetchSetUsing(dto: ss) {
  return await http.post("/achievement/set", dto);
}
export async function fetchUserAchievement(dto: ss) {
  return await http.post("/achievement/use", dto);
}
