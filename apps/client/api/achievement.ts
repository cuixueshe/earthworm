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
// 颁布成就
export async function fetchPubAchievement(dto: PublishDto) {
  return await http.post("/achievement/publish", dto);
}
// 获取成就列表
export async function fetchAllAchievements() {
  return await http.get("/achievement/list");
}
export async function fetchAuthUser(dto: UserDto) {
  //   return await http.get("/achievement/authUser", dto);
  return await http.get("/achievement/authUser");
}
export async function fetchSetUsing(dto: ss) {
  return await http.post("/achievement/set", dto);
}
export async function s(dto: ss) {
  return await http.post("/achievement/use", dto);
}
