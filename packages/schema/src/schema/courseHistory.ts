import { integer, pgTable, serial, text, unique } from "drizzle-orm/pg-core";

export const courseHistory = pgTable(
  "course_history",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    courseId: integer("course_id").notNull(),
    coursePackId: integer("course_pack_id").notNull(),
    completionCount: integer("completion_count").notNull().default(0),
  },
  (t) => ({
    unq: unique().on(t.userId, t.courseId, t.coursePackId),
  }),
);
