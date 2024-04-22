import { http } from "./http";

export interface CourseHistory {
  courseId: string;
  completionCount: number;
}

export async function fetchCourseHistory(coursePackId: string) {
  return await http.get<CourseHistory[], CourseHistory[]>(`/course-history/${coursePackId}`);
}
