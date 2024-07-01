ALTER TABLE "course_packs" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "course_packs" ADD COLUMN "share_level" text DEFAULT 'private';