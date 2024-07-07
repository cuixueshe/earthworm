CREATE TYPE membership_type AS ENUM ('regular', 'premium');

CREATE TABLE IF NOT EXISTS "courses" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text DEFAULT '',
	"video" text DEFAULT '',
	"order" integer NOT NULL,
	"course_pack_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_history" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"course_id" text NOT NULL,
	"course_pack_id" text NOT NULL,
	"completion_count" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "course_history_user_id_course_id_course_pack_id_unique" UNIQUE("user_id","course_id","course_pack_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_packs" (
	"id" text PRIMARY KEY NOT NULL,
	"order" integer NOT NULL,
	"title" text NOT NULL,
	"description" text DEFAULT '',
	"is_free" boolean,
	"cover" text,
	"creator_id" text NOT NULL,
	"share_level" text DEFAULT 'private',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "memberships" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"isActive" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"type" "membership_type" DEFAULT 'regular' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "statements" (
	"id" text PRIMARY KEY NOT NULL,
	"order" integer NOT NULL,
	"chinese" text NOT NULL,
	"english" text NOT NULL,
	"soundmark" text NOT NULL,
	"course_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_course_progress" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"course_pack_id" text NOT NULL,
	"course_id" text NOT NULL,
	"statement_index" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "user_course_progress_user_id_course_pack_id_unique" UNIQUE("user_id","course_pack_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_learn_record" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	"day" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "user_learn_record_user_id_day_unique" UNIQUE("user_id","day")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courses" ADD CONSTRAINT "courses_course_pack_id_course_packs_id_fk" FOREIGN KEY ("course_pack_id") REFERENCES "public"."course_packs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "statements" ADD CONSTRAINT "statements_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
