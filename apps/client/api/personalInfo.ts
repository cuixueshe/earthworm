import { http } from "./http";

export interface PersonalInfoDto {
  username: string;
}

export async function updatePersonalInfo(userId: string, info: PersonalInfoDto) {
  return await http.patch<PersonalInfoDto, PersonalInfoDto>(
    `/user/updatePersonalInfo/${userId}`,
    info,
  );
}
