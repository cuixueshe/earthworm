import { http } from "./http";

interface UserProgressVo {
  courseId: number;
}

interface UserProgressDto {
  coursePackId: string;
  courseId: string;
  statementIndex: number;
}

export async function fetchUpdateCourseProgress(dto: UserProgressDto) {
  return await http.put<UserProgressVo, UserProgressVo>(`user-progress`, dto);
}
