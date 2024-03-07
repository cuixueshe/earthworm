import { http } from "./http";

export interface CourseProgress {
  courseId: number;
  progress: string;
}

export interface CourseHistory extends CourseProgress {
  completionCount: number;
}

export async function fetchCourseHistory() {
  return await http.get<CourseHistory[], CourseHistory[]>("/course-history");
}

export async function fetchCourseProgress(courseId: number, progress?: string) {
  return await http.post<CourseProgress[], CourseProgress[]>(
    "/course-history/course-progress",
    { courseId, progress }
  );
}
