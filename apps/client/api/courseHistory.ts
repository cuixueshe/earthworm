import { http } from "./http";

export interface CourseHistory {
  courseId: number;
  completionCount: number;
}

export async function fetchCourseHistory() {
  return await http.get<CourseHistory[], CourseHistory[]>("/course-history");
}
