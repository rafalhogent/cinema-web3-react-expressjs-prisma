-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(150) NOT NULL,
    `lastname` VARCHAR(150) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `password` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
