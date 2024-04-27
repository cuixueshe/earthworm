import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { coursePack } from "./coursePack";
import { statement } from "./statement";

export const course = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  coursePackId: integer("course_pack_id")
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
