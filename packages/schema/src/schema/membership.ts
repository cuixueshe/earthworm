import { createId } from "@paralleldrive/cuid2";
import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

// 定义会员类型的枚举
const membershipTypeEnum = pgEnum("membership_type", ["regular", "founder"]);

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
  type: membershipTypeEnum("type").notNull().default("regular"),
});
