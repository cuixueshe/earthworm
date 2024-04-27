import { type Course } from "~/store/course";
import { http } from "./http";

export interface CoursePack {
  id: string;
  title: string;
  isFree: boolean;
  description: string;
}

export interface CoursePack2 {
  id: string;
  title: string;
  description: string;
  progress: number;
  isFree: boolean;
  courses: Array<Course>;
}

export async function fetchCoursePacks() {
  return await http.get<CoursePack[], CoursePack[]>("/course-pack");
}

export async function fetchCoursePack(coursePackId: string) {
  return await http.get<CoursePack2, CoursePack2>(`/course-pack/${coursePackId}`);
}
