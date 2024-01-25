import { type Course } from "~/store/course-new";
import { useFetchPlus } from "~/composables/useFetch";
import { http } from "./http";

export async function fetchCourse(courseId: number) {
  return await http.get<Course, Course>(`/courses/${courseId}`);
}

export async function fetchNextCourse(courseId: number) {
  return await http.get<Course, Course>(`/courses/${courseId}/next`);
  // const { data: courses } = await useFetchPlus<Course>(
  //   `/courses/${courseId}/next`
  // );

  // return courses.value;
}
