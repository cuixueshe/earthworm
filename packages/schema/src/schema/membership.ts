import { createId } from "@paralleldrive/cuid2";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const membership = pgTable("memberships", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id").notNull(),
  start_date: timestamp("start_date").notNull(),
  end_date: timestamp("end_date").notNull(),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
  type: text("type").notNull().default("regular"), // 先用 string 的形式， 后面需要改成枚举
});
