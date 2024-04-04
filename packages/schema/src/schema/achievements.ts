import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const achievements = mysqlTable("achievements", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 20 }).notNull(),
  description: varchar("description", { length: 30 }).notNull(),
});
