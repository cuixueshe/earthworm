import { type Course } from "~/store/course";
import { http } from "./http";

export async function fetchCourse(courseId: number) {
  return await http.get<Course, Course>(`/courses/${courseId}`);
}

export async function fetchNextCourse(courseId: number) {
  return await http.get<Course, Course>(`/courses/${courseId}/next`);
}

export async function fetchCourses() {
  return await http.get<Course[], Course[]>("/courses");
}
