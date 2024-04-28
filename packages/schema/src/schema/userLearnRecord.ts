import { date, integer, pgTable, serial, text, unique } from "drizzle-orm/pg-core";

export const userLearnRecord = pgTable(
  "user_learn_record",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    count: integer("count").notNull().default(0),
    day: date("day").notNull(),
  },
  (t) => ({
    unq: unique().on(t.userId, t.day),
  }),
);
