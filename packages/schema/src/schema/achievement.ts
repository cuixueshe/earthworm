import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { boolean, jsonb, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { achievementCategory } from "./achievementCategory";

/**
 * 成就类型
 * 有限阶梯成就 练习签到 N 天
 * 无限阶梯成就
 * 计数成就 完成 N 次
 * 条件成就 获得一次周榜第一
 * 其他成就
 */
export const achievementTypeEnum = pgEnum("achievementTypeEnum", [
  "limitedLadder",
  "infiniteLadder",
  "count",
  "condition",
  "other",
]);

export const achievement = pgTable("achievements", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: achievementTypeEnum("type").notNull(),
  categoryId: text("achievement_category_id").references(() => achievementCategory.id),
  limitedLadderMetaData: jsonb("limited_ladder_meta_data").notNull().$type<{
    targetNum: number;
    stepSize: number;
    stepSizes: number[];
    unit: string;
  }>(),

  /**
   * 无限阶梯成就只能按倍数完成
   */
  infiniteLadderMetaData: jsonb("infinite_ladder_meta_data").notNull().$type<{
    stepSize: number;
    unit: string;
  }>(),

  countMetaData: jsonb("count_meta_data").notNull().$type<{
    count: number;
    unit: string;
  }>(),

  /**
   * data-url or http-url of image svg
   */
  icon: text("icon").notNull(),

  /**
   * 是否为隐藏成就，只有完成后才可见
   */
  hidable: boolean("is_hidable").notNull().default(false),

  /**
   * 未启用的成就,不会累计进度
   */
  enable: boolean("is_enabled").notNull().default(false),

  /**
   * 完成的奖励
   */
  rewards: jsonb("rewards").$type<Array<{ type: "badge" | "coin" | "ex"; value: number }>>(),
  /**
   * 奖励结算方式
   */
  rewardSettlementMethod: text("reward_settlement_method", {
    enum: ["manual", "auto"],
  }),

  /**
   * 阶梯成就奖励计算方式
   */
  rewardCalcMethodOfLadderAchievement: text("reward_calc_method", {
    enum: ["fixed", "progressive"],
  }),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});

export const achievementRelations = relations(achievement, ({ one }) => ({
  category: one(achievementCategory, {
    fields: [achievement.categoryId],
    references: [achievementCategory.id],
  }),
}));
