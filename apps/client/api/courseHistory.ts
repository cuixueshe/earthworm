import { http } from "./http";

export interface CourseHistory {
  courseId: string;
  completionCount: number;
}

export async function fetchCourseHistory(coursePackId: number) {
  return await http.get<CourseHistory[], CourseHistory[]>(`/course-history/${coursePackId}`);
}
