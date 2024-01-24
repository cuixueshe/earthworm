import { useFetchPlus } from "~/composables/useFetch";

interface Course {
  title: string;
  id: number;
  statements: Array<any>;
}

export async function fetchCourse(courseId: number) {
  const { data: courses } = await useFetchPlus<Course>(`/courses/${courseId}`);

  return courses;
}

export async function fetchNextCourse(courseId: number) {
  const { data: courses } = await useFetchPlus<Course>(
    `/courses/${courseId}/next`
  );

  return courses;
}
