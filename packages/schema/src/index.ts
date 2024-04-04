import { achievements } from "./schema/achievements";
import { course } from "./schema/course";
import { courseHistory } from "./schema/courseHistory";
import { statement } from "./schema/statement";
import { user } from "./schema/user";
import { userAchievements } from "./schema/userAchievements";
import { userProfile } from "./schema/userProfile";
import { userProgress } from "./schema/userProgress";
export * from "./schema/achievements";
export * from "./schema/course";
export * from "./schema/courseHistory";
export * from "./schema/statement";
export * from "./schema/user";
export * from "./schema/userAchievements";
export * from "./schema/userProfile";
export * from "./schema/userProgress";
export const schemas = {
  course,
  statement,
  user,
  userProgress,
  courseHistory,
  achievements,
  userProfile,
  userAchievements,
};
