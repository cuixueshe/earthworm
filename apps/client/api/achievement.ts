import { http } from "./http";

interface PublishDto {
  secretKey: string;
  userID: number;
  chioceAchievement: number[];
}
interface UserDto {
  phone: string;
}
interface ss {
  name: string;
}
export async function fetchPubAchievement(dto: PublishDto) {
  return await http.post("/achievement/publish", dto);
}
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
