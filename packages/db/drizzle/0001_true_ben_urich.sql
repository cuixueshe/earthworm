ALTER TABLE "user_course_progress" ADD COLUMN "course_pack_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user_course_progress" ADD COLUMN "statement_index" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "course_packs" DROP COLUMN IF EXISTS "progress";--> statement-breakpoint
ALTER TABLE "user_course_progress" ADD CONSTRAINT "user_course_progress_user_id_course_id_course_pack_id_unique" UNIQUE("user_id","course_id","course_pack_id");