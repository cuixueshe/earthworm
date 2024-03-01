import { type Course } from "~/store/course";
import { http } from "./http";

export async function fetchCourse(courseId: number) {
  return await http.get<Course, Course>(`/courses/${courseId}`);
}

export async function fetchCompleteCourse(courseId: number) {
  return await http.post<Course, Course>(`/courses/${courseId}/complete`);
}

export async function fetchCourses() {
  return await http.get<Course[], Course[]>("/courses");
}

export async function fetchTryCourse() {
  return await http.get<Course, Course>(`/courses/try`);
}
