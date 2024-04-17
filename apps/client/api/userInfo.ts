import { http } from "./http";

interface UserInfoDto {
  name: string;
}
export async function updateUsername(name: UserInfoDto) {
  return await http.get("/user/info/updatename", {
    params: name,
  });
}
