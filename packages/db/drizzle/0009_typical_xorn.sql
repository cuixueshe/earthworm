CREATE TABLE IF NOT EXISTS "mastered_elements" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"content" jsonb NOT NULL,
	"mastered_at" timestamp DEFAULT now()
);
