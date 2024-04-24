CREATE TABLE IF NOT EXISTS "musics" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"song_url" text NOT NULL,
	"lyrics" jsonb NOT NULL
);
