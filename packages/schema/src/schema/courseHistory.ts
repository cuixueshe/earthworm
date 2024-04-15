import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const courseHistory = pgTable("course-history", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  completionCount: integer("completion_count").notNull().default(0),
});
