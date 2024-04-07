import { type Course } from "~/store/course";
import { http } from "./http";

export async function fetchCourse(courseId: number) {
  return await http.get<Course, Course>(`/courses/${courseId}`);
}

type CompleteCourseResponse = { nextCourse: Course | undefined };
export async function fetchCompleteCourse(courseId: number) {
  return await http.post<CompleteCourseResponse, CompleteCourseResponse>(
    `/courses/${courseId}/complete`
  );
}

export async function fetchCourses() {
  return await http.get<Course[], Course[]>("/courses");
}

export async function fetchTryCourse() {
  return await http.get<Course, Course>(`/courses/try`);
}
