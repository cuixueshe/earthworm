import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const membership = pgTable("memberships", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  start_date: timestamp("start_date").notNull(),
  end_date: timestamp("end_date").notNull(),
  isActive: boolean("isActive"),
});
