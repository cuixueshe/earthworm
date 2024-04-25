import { integer, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";

export const userCourseProgress = pgTable(
  "user_course_progress",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    coursePackId: integer("course_pack_id").notNull(),
    courseId: integer("course_id").notNull(),
    statementIndex: integer("statement_index").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
  },
  (t) => ({
    unq: unique().on(t.userId, t.courseId, t.coursePackId),
  }),
);
