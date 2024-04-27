import { course, courseRelations } from "./schema/course";
import { courseHistory } from "./schema/courseHistory";
import { coursePack, coursePackRelations } from "./schema/coursePack";
import { membership } from "./schema/membership";
import { statement, statementRelations } from "./schema/statement";
import { userCourseProgress } from "./schema/userCourseProgress";
import { userLearnRecord } from "./schema/userLearnRecord";

export * from "./schema/course";
export * from "./schema/courseHistory";
export * from "./schema/statement";
export * from "./schema/userLearnRecord";
export * from "./schema/userCourseProgress";
export * from "./schema/membership";
export * from "./schema/coursePack";

export const schemas = {
  course,
  statement,
  statementRelations,
  membership,
  userCourseProgress,
  courseHistory,
  userLearnRecord,
  coursePack,
  courseRelations,
  coursePackRelations,
};

export type SchemaType = typeof schemas;
