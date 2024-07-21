import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { achievement } from "./achievement";

export const userAchievement = pgTable("user_achievements", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id").notNull(),
  achievementId: text("achievement_id")
    .notNull()
    .references(() => achievement.id),
  completed: boolean("completed").default(false),
  progress: integer("progress").default(0),
  /**
   * 剩余的领取次数
   */
  remainingNum: integer("remaining").default(0),
  /**
   * 总领取次数
   */
  receiveNum: integer("receive_num").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});

export const userAchievementRelations = relations(userAchievement, ({ one }) => ({
  achievement: one(achievement, {
    fields: [userAchievement.achievementId],
    references: [achievement.id],
  }),
}));
