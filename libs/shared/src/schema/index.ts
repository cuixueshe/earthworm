import { course } from "./course";
import { statement } from "./statement";
import { user } from "./user";
import { userProgress } from "./userProgress";
import { courseHistory } from "./courseHistory";

export * from "./course";
export * from "./statement";
export * from "./user";
export * from "./userProgress";
export * from "./courseHistory";
export const schemas = {
  course,
  statement,
  user,
  userProgress,
  courseHistory,
};
