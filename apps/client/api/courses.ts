import { useFetchPlus } from "~/composables/useFetch";

interface Course {
  title: string;
  id: number;
}

export async function fetchCourse(courseId: number) {
  const { data: courses } = await useFetchPlus<Course[]>(
    `/courses/${courseId}`
  );

  return courses;
}
