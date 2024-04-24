import { course } from "./schema/course";
import { courseHistory } from "./schema/courseHistory";
import { membership } from "./schema/membership";
import { music } from "./schema/music";
import { statement } from "./schema/statement";
import { userLearnRecord } from "./schema/userLearnRecord";
import { userProgress } from "./schema/userProgress";

export * from "./schema/course";
export * from "./schema/courseHistory";
export * from "./schema/statement";
export * from "./schema/userLearnRecord";
export * from "./schema/userProgress";
export * from "./schema/membership";
export * from "./schema/music";

export const schemas = {
  course,
  statement,
  membership,
  userProgress,
  courseHistory,
  userLearnRecord,
  music,
};

export type SchemaType = typeof schemas;
