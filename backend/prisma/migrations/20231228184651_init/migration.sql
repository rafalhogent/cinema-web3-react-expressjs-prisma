-- CreateTable
CREATE TABLE `Film` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titel` VARCHAR(100) NOT NULL,
    `beschrijving` VARCHAR(250) NOT NULL,
    `genre` VARCHAR(45) NOT NULL,
    `speelduur` INTEGER NOT NULL,
    `releasejaar` SMALLINT NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
