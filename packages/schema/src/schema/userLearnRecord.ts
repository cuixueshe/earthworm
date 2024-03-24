import { int, mysqlTable, timestamp } from "drizzle-orm/mysql-core";

export const userLearnRecord = mysqlTable("user-learn-record", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  count: int("count").notNull().default(0),
  date: timestamp("date").notNull().defaultNow(),
});
