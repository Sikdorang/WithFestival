-- AlterTable
ALTER TABLE `menus` ADD COLUMN `margin` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `event` TEXT NULL,
    ADD COLUMN `notice` TEXT NULL,
    MODIFY `name` VARCHAR(50) NULL;

-- CreateTable
CREATE TABLE `messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,
    `tableNumber` VARCHAR(10) NULL,
    `userid` INTEGER NULL,
    `time` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
