import { http } from "./http";

interface UserProgressVo {
  courseId: number;
}

interface UserProgressDto {
  courseId: number;
}

export async function fetchUserProgress() {
  return await http.get<UserProgressVo, UserProgressVo>("/user-progress");
}

export async function fetchUpdateProgress(dto: UserProgressDto) {
  return await http.put<UserProgressVo, UserProgressVo>("/user-progress", dto);
}
