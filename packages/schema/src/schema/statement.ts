import { int, mysqlTable, text } from "drizzle-orm/mysql-core";
import { course } from "./course";

export const statement = mysqlTable("statements", {
    id: int("id").autoincrement().primaryKey(),
    order: int("order").unique().notNull(),
    chinese: text('chinese').notNull(),
    english: text("english").notNull(),
    soundmark: text("soundmark").notNull(),
    courseId: int("course_id").references(() => course.id)
})