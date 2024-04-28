ALTER TABLE "statements" DROP CONSTRAINT "statements_order_unique";--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "course_pack_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "course_history" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "course_history" ALTER COLUMN "course_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "course_history" ALTER COLUMN "course_pack_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "course_history" ALTER COLUMN "completion_count" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "course_packs" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "memberships" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "statements" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "statements" ALTER COLUMN "course_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_course_progress" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_course_progress" ALTER COLUMN "course_pack_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_course_progress" ALTER COLUMN "course_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_learn_record" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "order" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "course_packs" ADD COLUMN "order" integer NOT NULL;