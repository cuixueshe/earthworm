import { createId } from "@paralleldrive/cuid2";
import { integer, pgTable, text, unique } from "drizzle-orm/pg-core";

export const courseHistory = pgTable(
  "course_history",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("user_id").notNull(),
    courseId: text("course_id").notNull(),
    coursePackId: text("course_pack_id").notNull(),
    completionCount: integer("completion_count").notNull(),
  },
  (t) => ({
    unq: unique().on(t.userId, t.courseId, t.coursePackId),
  }),
);
