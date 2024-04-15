CREATE TABLE IF NOT EXISTS "courses" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course-history" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"course_id" integer NOT NULL,
	"completion_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "statements" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer NOT NULL,
	"chinese" text NOT NULL,
	"english" text NOT NULL,
	"soundmark" text NOT NULL,
	"course_id" integer,
	CONSTRAINT "statements_order_unique" UNIQUE("order")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user-learn-record" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user-progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "statements" ADD CONSTRAINT "statements_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
