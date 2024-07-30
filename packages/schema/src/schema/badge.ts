import { createId } from "@paralleldrive/cuid2";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const badge = pgTable("badges", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type", {
    enum: ["static", "dynamic"],
  })
    .notNull()
    .default("static"),
  primaryColor: text("primary_color").default("#fff"),
  secondaryColor: text("secondary_color").default("#000"),
  tertiaryColor: text("secondary_color").default("#fff"),
  /**
   * data-url or http-url of image svg
   */
  content: text("content").notNull(),
  /**
   * 是否为可穿戴, 穿戴后可以被其他用户可见
   */
  wearable: boolean("wearable").notNull().default(false),
  enable: boolean("enable").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});
