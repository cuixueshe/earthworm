import { jsonb, pgTable, serial, text } from "drizzle-orm/pg-core";

export const music = pgTable("musics", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  songUrl: text("song_url").notNull(),
  lyrics: jsonb("lyrics").notNull(),
});
