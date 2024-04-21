import { course, courseRelations } from "./schema/course";
import { courseHistory } from "./schema/courseHistory";
import { coursePack, coursePackRelations } from "./schema/coursePack";
import { membership } from "./schema/membership";
import { statement, statementRelations } from "./schema/statement";
import { userLearnRecord } from "./schema/userLearnRecord";
import { userProgress } from "./schema/userProgress";

export * from "./schema/course";
export * from "./schema/courseHistory";
export * from "./schema/statement";
export * from "./schema/userLearnRecord";
export * from "./schema/userProgress";
export * from "./schema/membership";
export * from "./schema/coursePack";

export const schemas = {
  course,
  statement,
  statementRelations,
  membership,
  userProgress,
  courseHistory,
  userLearnRecord,
  coursePack,
  courseRelations,
  coursePackRelations,
};

export type SchemaType = typeof schemas;
