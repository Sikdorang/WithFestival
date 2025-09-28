-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(100) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `account` VARCHAR(100) NULL,

    UNIQUE INDEX `users_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `image` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `userid` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `waitings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `people` INTEGER NOT NULL,
    `phoneNumber` VARCHAR(20) NOT NULL,
    `time` DATETIME(3) NOT NULL,
    `processed` BOOLEAN NOT NULL DEFAULT false,
    `userid` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` VARCHAR(10) NOT NULL,
    `send` BOOLEAN NOT NULL DEFAULT false,
    `cooked` BOOLEAN NOT NULL DEFAULT false,
    `totalPrice` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `tableNumber` VARCHAR(10) NOT NULL,
    `userid` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `count` INTEGER NOT NULL,
    `orderId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
