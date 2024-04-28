import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { coursePack } from "./coursePack";
import { statement } from "./statement";

export const course = pgTable("courses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: varchar("title", { length: 256 }).notNull(),
  order: integer("order").notNull(),
  coursePackId: text("course_pack_id")
    .notNull()
    .references(() => coursePack.id),
});

export const courseRelations = relations(course, ({ one, many }) => ({
  statements: many(statement),
  coursePack: one(coursePack, {
    fields: [course.coursePackId],
    references: [coursePack.id],
  }),
}));
