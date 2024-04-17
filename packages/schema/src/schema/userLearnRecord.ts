import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const userLearnRecord = pgTable("user-learn-record", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  count: integer("count").notNull().default(0),
  date: timestamp("date").notNull().defaultNow(),
});
