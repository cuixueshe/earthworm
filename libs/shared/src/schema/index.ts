import { course } from "./course";
import { statement } from "./statement";
import { user } from "./user";
import { userProgress } from "./userProgress";

export * from "./course";
export * from "./statement";
export * from "./user";
export * from "./userProgress";
export const schemas = {
  course,
  statement,
  user,
  userProgress,
};
