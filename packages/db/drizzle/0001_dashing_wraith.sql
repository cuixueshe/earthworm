ALTER TABLE `users` RENAME COLUMN `name` TO `nickname`;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_username_unique` UNIQUE(`username`);--> statement-breakpoint
ALTER TABLE `users` DROP INDEX `users_phone_unique`;--> statement-breakpoint
ALTER TABLE `users` ADD `username` varchar(20) NOT NULL;