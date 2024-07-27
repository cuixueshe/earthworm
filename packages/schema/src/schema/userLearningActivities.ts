import { createId } from "@paralleldrive/cuid2";
import { date, integer, jsonb, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";

export const userLearningActivities = pgTable(
  "user_learning_activities",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("user_id").notNull(),
    date: date("date").notNull(),
    activityType: text("activity_type").notNull(),
    courseId: text("course_id"),
    duration: integer("duration").notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
  },
  (t) => ({
    unq: unique().on(t.userId, t.date, t.activityType),
  }),
);
