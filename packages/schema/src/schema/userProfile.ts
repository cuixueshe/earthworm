import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const userProfile = mysqlTable("userProfile", {
  userID: int("userID"),
  achievementID: int("achievementID"),
  avatar: varchar("avatar", { length: 100 }),
});
