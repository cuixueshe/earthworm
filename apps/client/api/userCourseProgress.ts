import { http } from "./http";

interface UserProgressResponse {
  courseId: string;
}

interface UserProgressUpdate {
  coursePackId: string;
  courseId: string;
  statementIndex: number;
}

export interface UserRecentCoursePackResponse {
  id: number;
  coursePackId: string;
  courseId: string;
  title: string;
  description: string;
  cover: string;
}

export async function fetchUpdateCourseProgress(userProgressUpdate: UserProgressUpdate) {
  return await http.put<UserProgressResponse, UserProgressResponse>(
    `user-course-progress`,
    userProgressUpdate,
  );
}

export async function fetchUserRecentCoursePacks() {
  return await http.get<UserRecentCoursePackResponse[], UserRecentCoursePackResponse[]>(
    `/user-course-progress/recent-course-packs`,
  );
}

export async function fetchUserRecentCoursePacksByUserId(userId: string, limit = 4) {
  return await http.get<unknown, UserRecentCoursePackResponse[]>(
    `/user-course-progress/recent-course-packs-by-user-id`,
    {
      params: {
        userId,
        limit,
      },
    },
  );
}
