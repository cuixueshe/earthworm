import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

import { course } from "./course";

export const statement = pgTable("statements", {
  id: serial("id").primaryKey(),
  order: integer("order").unique().notNull(),
  chinese: text("chinese").notNull(),
  english: text("english").notNull(),
  soundmark: text("soundmark").notNull(),
  courseId: integer("course_id")
    .notNull()
    .references(() => course.id),
});

export const statementRelations = relations(statement, ({ one }) => ({
  course: one(course, {
    fields: [statement.courseId],
    references: [course.id],
  }),
}));
