import type { CourseApiResponse, StatementApiResponse } from "~/api/course";

export interface Statement extends StatementApiResponse {}
export interface Course extends CourseApiResponse {
  statements: Statement[];
}
