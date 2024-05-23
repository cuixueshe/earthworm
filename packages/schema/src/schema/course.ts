import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { coursePack } from "./coursePack";
import { statement } from "./statement";

export const course = pgTable("courses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").default(""),
  video: text("video").default(""),
  order: integer("order").notNull(),
  coursePackId: text("course_pack_id")
    .notNull()
    .references(() => coursePack.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});

export const courseRelations = relations(course, ({ one, many }) => ({
  statements: many(statement),
  coursePack: one(coursePack, {
    fields: [course.coursePackId],
    references: [coursePack.id],
  }),
}));
