import { http } from "./http";

export interface CourseHistory {
  courseId: number;
  completionCount: string;
  progress: number;
}

export async function fetchCourseHistory() {
  return await http.get<CourseHistory[], CourseHistory[]>("/course-history");
}

interface CourseProgress {
  courseId: number;
  currentIndex: number;
}

export async function updateCourseProgress(dto: CourseProgress) {
  return await http.post<CourseProgress[], CourseProgress[]>(
    "/course-history/updateProgress",
    dto
  );
}

export async function fetchCurrentCourseHistory(courseId: number) {
  return await http.get<CourseHistory, CourseHistory>(
    `/course-history/progress/${courseId}`
  );
}
