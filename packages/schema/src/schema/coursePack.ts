import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";

import { course } from "./course";

export const coursePack = pgTable("course_packs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  order: integer("order").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  isFree: boolean("is_free"),
});

export const coursePackRelations = relations(coursePack, ({ many }) => ({
  courses: many(course),
}));
