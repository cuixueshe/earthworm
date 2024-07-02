ALTER TABLE "course_packs" RENAME COLUMN "user_id" TO "creator_id";--> statement-breakpoint
ALTER TABLE "memberships" ALTER COLUMN "isActive" SET DEFAULT true;