import { int, mysqlTable, timestamp } from "drizzle-orm/mysql-core";

export const userAchievements = mysqlTable("userAchievements", {
  id: int("id").autoincrement().primaryKey(),
  userID: int("userID"),
  achievementID: int("achievementID"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
