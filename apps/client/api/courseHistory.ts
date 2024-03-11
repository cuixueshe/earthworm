import { http } from "./http";

export interface CourseHistory {
  courseId: number;
  completionCount: string;
}

export async function fetchCourseHistory() {
  return await http.get<CourseHistory[], CourseHistory[]>("/course-history");
}
