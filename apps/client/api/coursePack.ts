import { type Course } from "~/store/course";
import { http } from "./http";

export type CoursePacksResponse = Array<{
  id: string;
  title: string;
  isFree: boolean;
  description: string;
  cover: string;
}>;

export interface CoursePackResponse {
  id: string;
  title: string;
  description: string;
  isFree: boolean;
  cover: string;
  courses: Array<Course>;
}

export async function fetchCoursePacks() {
  return await http.get<CoursePacksResponse, CoursePacksResponse>("/course-pack");
}

export async function fetchCoursePack(coursePackId: string) {
  return await http.get<CoursePackResponse, CoursePackResponse>(`/course-pack/${coursePackId}`);
}
