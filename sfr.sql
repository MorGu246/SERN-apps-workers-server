CREATE TABLE IF NOT EXISTS `entrances_and_exits` (
    `id` INT AUTO_INCREMENT NOT NULL UNIQUE,
    `tz` VARCHAR(9) NOT NULL,
    `action_type` ENUM('check_in', 'check_out') NOT NULL,
    `log_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);