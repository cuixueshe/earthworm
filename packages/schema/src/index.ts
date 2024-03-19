import { course } from "./schema/course";
import { courseHistory } from "./schema/courseHistory";
import { statement } from "./schema/statement";
import { user } from "./schema/user";
import { userProgress } from "./schema/userProgress";

export * from "./schema/course";
export * from "./schema/courseHistory";
export * from "./schema/statement";
export * from "./schema/user";
export * from "./schema/userProgress";

export const schemas = {
  course,
  statement,
  user,
  userProgress,
  courseHistory,
};
