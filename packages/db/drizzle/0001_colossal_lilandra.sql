CREATE TABLE `course-history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`course_id` int NOT NULL,
	`completion_count` int NOT NULL DEFAULT 0,
	CONSTRAINT `course-history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `courses` MODIFY COLUMN `id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `phone` varchar(20) NOT NULL;