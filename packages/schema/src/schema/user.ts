import {
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const user = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 20 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  nickname: text("nickname").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});
