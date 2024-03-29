import { int, mysqlTable } from "drizzle-orm/mysql-core";

export const courseHistory = mysqlTable("course-history", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  courseId: int("course_id").notNull(),
  completionCount: int("completion_count").notNull().default(0),
  progress: int("progress").notNull().default(0),
});
