import { int, mysqlTable, text, timestamp } from "drizzle-orm/mysql-core";

export const user = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  phone: text("phone").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().onUpdateNow(),
});
