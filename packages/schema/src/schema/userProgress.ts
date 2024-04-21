import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const userProgress = pgTable("user_course_progress", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
});
