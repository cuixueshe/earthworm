import { createId } from "@paralleldrive/cuid2";
import { date, integer, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";

export const userLearnRecord = pgTable(
  "user_learn_record",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("user_id").notNull(),
    count: integer("count").notNull().default(0),
    day: date("day").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
  },
  (t) => ({
    unq: unique().on(t.userId, t.day),
  }),
);
