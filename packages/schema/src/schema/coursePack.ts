import { relations } from "drizzle-orm";
import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

import { course } from "./course";

export const coursePack = pgTable("course_packs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  isFree: boolean("is_free"),
});

export const coursePackRelations = relations(coursePack, ({ many }) => ({
  courses: many(course),
}));
