import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { badge } from "./badge";

export const userBadge = pgTable("user_badges", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id").notNull(),
  badgeId: text("badge_id")
    .references(() => badge.id)
    .notNull(),
  grantType: text("type", {
    enum: ["achievement", "manual"],
  }).notNull(),

  level: integer("level").notNull().default(0),
  value: integer("value").notNull().default(0),
  read: boolean("read").notNull().default(false),
  /**
   * 是否佩戴徽章
   */
  isWearing: boolean("is_wearing").default(false),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});

export const userBadgeRelations = relations(userBadge, ({ one }) => ({
  badge: one(badge, {
    fields: [userBadge.badgeId],
    references: [badge.id],
  }),
}));
