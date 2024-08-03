import { type Course } from "~/types";
import { getHttp } from "./http";

export interface StatementApiResponse {
  id: string;
  order: number;
  chinese: string;
  english: string;
  soundmark: string;
  isMastered: boolean;
}

export interface CourseApiResponse {
  id: string;
  title: string;
  description: string;
  order: number;
  statements: StatementApiResponse[];
  coursePackId: string;
  completionCount: number;
  statementIndex: number;
  video: string;
}

export async function fetchCourse(coursePackId: string, courseId: string) {
  const http = getHttp();
  return (await http<CourseApiResponse>(`course-pack/${coursePackId}/courses/${courseId}`, {
    method: "get",
  })) as Course;
}

type CompleteCourseResponse = { nextCourse: CourseApiResponse | undefined };
export async function fetchCompleteCourse(coursePackId: string, courseId: string) {
  const http = getHttp();
  return transformerFetchCompleteCourse(
    await http<CompleteCourseResponse>(
      `/course-pack/${coursePackId}/courses/${courseId}/complete`,
      { method: "post" },
    ),
  );
}

function transformerFetchCompleteCourse(apiResponse: CompleteCourseResponse): {
  nextCourse: Course | undefined;
} {
  return {
    nextCourse: apiResponse.nextCourse as Course,
  };
}
