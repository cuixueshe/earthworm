import type {
  UserProgressApiResponse,
  UserRecentCoursePackApiResponse,
} from "~/api/user-course-progress";

export interface UserProgress extends UserProgressApiResponse {}

export interface UserRecentCoursePack extends UserRecentCoursePackApiResponse {}
