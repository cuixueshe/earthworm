CREATE TABLE IF NOT EXISTS "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"course_pack_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"course_id" integer NOT NULL,
	"course_pack_id" integer NOT NULL,
	"completion_count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "course_history_user_id_course_id_course_pack_id_unique" UNIQUE("user_id","course_id","course_pack_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_packs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"progress" integer,
	"is_free" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "memberships" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"isActive" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "statements" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer NOT NULL,
	"chinese" text NOT NULL,
	"english" text NOT NULL,
	"soundmark" text NOT NULL,
	"course_id" integer NOT NULL,
	CONSTRAINT "statements_order_unique" UNIQUE("order")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_learn_record" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	"day" date NOT NULL,
	CONSTRAINT "user_learn_record_user_id_day_unique" UNIQUE("user_id","day")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_course_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courses" ADD CONSTRAINT "courses_course_pack_id_course_packs_id_fk" FOREIGN KEY ("course_pack_id") REFERENCES "course_packs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "statements" ADD CONSTRAINT "statements_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
