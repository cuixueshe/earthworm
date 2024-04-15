import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const course = pgTable("courses", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
});
