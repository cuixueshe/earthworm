import { int, mysqlTable, text } from "drizzle-orm/mysql-core";

export const course = mysqlTable("courses", {
  id: int("id").primaryKey(),
  title: text("title").notNull(),
});
