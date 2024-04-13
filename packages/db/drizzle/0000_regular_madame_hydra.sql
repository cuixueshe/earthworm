CREATE TABLE `courses` (
	`id` int NOT NULL,
	`title` text NOT NULL,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `course-history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`course_id` int NOT NULL,
	`completion_count` int NOT NULL DEFAULT 0,
	CONSTRAINT `course-history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `statements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order` int NOT NULL,
	`chinese` text NOT NULL,
	`english` text NOT NULL,
	`soundmark` text NOT NULL,
	`course_id` int,
	CONSTRAINT `statements_id` PRIMARY KEY(`id`),
	CONSTRAINT `statements_order_unique` UNIQUE(`order`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`phone` varchar(20) NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_phone_unique` UNIQUE(`phone`)
);
--> statement-breakpoint
CREATE TABLE `user-progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`course_id` int NOT NULL,
	`user_id` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user-progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `statements` ADD CONSTRAINT `statements_course_id_courses_id_fk` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE no action ON UPDATE no action;