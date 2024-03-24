import {  timestamp, int, mysqlTable } from "drizzle-orm/mysql-core";

export const userLearnRecord = mysqlTable("user-finish-count", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("course_id").notNull(),
  userId: int("user_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
