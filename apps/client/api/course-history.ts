import type { CourseHistory } from "~/types";
import { getHttp } from "./http";

export interface CourseHistoryApiResponse {
  courseId: string;
  completionCount: number;
}

export async function fetchCourseHistory(coursePackId: string) {
  const http = getHttp();
  return (await http<CourseHistoryApiResponse[]>(`/course-history/${coursePackId}`, {
    method: "get",
  })) as CourseHistory[];
}
