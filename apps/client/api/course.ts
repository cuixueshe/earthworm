import type { CoursePack } from "~/store/coursePack";
import { type Course } from "~/store/course";
import { http } from "./http";

export async function fetchCourse(coursePackId: CoursePack["id"], courseId: Course["id"]) {
  return await http.get<Course, Course>(`course-pack/${coursePackId}/courses/${courseId}`);
}

type CompleteCourseResponse = { nextCourse: Course | undefined };
export async function fetchCompleteCourse(coursePackId: CoursePack["id"], courseId: Course["id"]) {
  return await http.post<CompleteCourseResponse, CompleteCourseResponse>(
    `/course-pack/${coursePackId}/courses/${courseId}/complete`,
  );
}
