import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { achievement } from "./achievement";

export const achievementCategory = pgTable("achievement-category", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  /**
   * data-url or http-url of image svg
   */
  icon: text("icon").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});

export const achievementCategoryRelations = relations(achievementCategory, ({ many }) => ({
  achievements: many(achievement),
}));
