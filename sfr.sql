CREATE TABLE IF NOT EXISTS `questions` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`tz` varchar(100) NOT NULL,
	`month` varchar(100) NOT NULL,
	`year` varchar(100) NOT NULL,
	PRIMARY KEY (`id`)
);