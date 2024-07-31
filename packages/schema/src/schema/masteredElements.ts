import { createId } from "@paralleldrive/cuid2";
import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const masteredElements = pgTable("mastered_elements", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id").notNull(),
  content: jsonb("content").notNull(),
  masteredAt: timestamp("mastered_at").defaultNow(),
});
