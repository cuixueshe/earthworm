import { http } from "./http";

interface UserProgressVo {
  courseId: number;
}

interface UserProgressDto {
  coursePackId: number;
  courseId: number;
  statementIndex: number;
}

export interface UserRecentCoursePackVo {
  id: number;
  coursePackId: number;
  courseId: number;
  title: string;
  description: string;
}

export async function fetchUpdateCourseProgress(dto: UserProgressDto) {
  return await http.put<UserProgressVo, UserProgressVo>(`user-course-progress`, dto);
}

export async function fetchUserRecentCoursePacks() {
  return await http.get<UserRecentCoursePackVo[], UserRecentCoursePackVo[]>(
    `/user-course-progress/recent-course-packs`,
  );
}
