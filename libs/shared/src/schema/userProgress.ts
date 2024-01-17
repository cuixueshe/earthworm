import { boolean, int, mysqlTable } from "drizzle-orm/mysql-core";

export const userProgress = mysqlTable("user-progress", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("course_id").notNull(),
  statementIndex: int("statement_index").notNull(),
  active: boolean("active").notNull().default(false),
  userId: int("user_id").notNull(),
});
