import { type UserRecentCoursePackApiResponse } from "~/types";
import { http } from "./http";

interface UserProgressResponse {
  courseId: string;
}

interface UserProgressUpdate {
  coursePackId: string;
  courseId: string;
  statementIndex: number;
}

export async function fetchUpdateCourseProgress(userProgressUpdate: UserProgressUpdate) {
  return await http.put<UserProgressResponse, UserProgressResponse>(
    `user-course-progress`,
    userProgressUpdate,
  );
}

export async function fetchUserRecentCoursePacks() {
  return await http.get<UserRecentCoursePackApiResponse[], UserRecentCoursePackApiResponse[]>(
    `/user-course-progress/recent-course-packs`,
  );
}
