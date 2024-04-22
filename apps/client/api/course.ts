import { type Course } from "~/store/course";
import { http } from "./http";

export async function fetchCourse(coursePackId: string, courseId: string) {
  return await http.get<Course, Course>(`course-pack/${coursePackId}/courses/${courseId}`);
}

type CompleteCourseResponse = { nextCourse: Course | undefined };
export async function fetchCompleteCourse(coursePackId: string, courseId: string) {
  return await http.post<CompleteCourseResponse, CompleteCourseResponse>(
    `/course-pack/${coursePackId}/courses/${courseId}/complete`,
  );
}

export async function fetchCourses() {
  return await http.get<Course[], Course[]>("/courses");
}

export async function fetchTryCourse() {
  return await http.get<Course, Course>(`/courses/try`);
}
