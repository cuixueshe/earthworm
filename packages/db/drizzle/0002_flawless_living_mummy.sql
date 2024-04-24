CREATE TABLE IF NOT EXISTS "musics" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"song" text NOT NULL,
	"singer" text,
	"poster" text,
	"lyrics" jsonb
);
