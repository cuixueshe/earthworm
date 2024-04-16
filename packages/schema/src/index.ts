import { course } from "./schema/course";
import { courseHistory } from "./schema/courseHistory";
import { statement } from "./schema/statement";
import { userLearnRecord } from "./schema/userLearnRecord";
import { userProgress } from "./schema/userProgress";

export * from "./schema/course";
export * from "./schema/courseHistory";
export * from "./schema/statement";
export * from "./schema/userLearnRecord";
export * from "./schema/userProgress";

export const schemas = {
  course,
  statement,
  userProgress,
  courseHistory,
  userLearnRecord,
};
