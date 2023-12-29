-- CreateTable
CREATE TABLE `Film` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `description` VARCHAR(1400) NOT NULL,
    `duration` INTEGER NOT NULL,
    `year` YEAR NOT NULL,
    `image` VARCHAR(550) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Actor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FilmToGenre` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FilmToGenre_AB_unique`(`A`, `B`),
    INDEX `_FilmToGenre_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ActorToFilm` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ActorToFilm_AB_unique`(`A`, `B`),
    INDEX `_ActorToFilm_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FilmToGenre` ADD CONSTRAINT `_FilmToGenre_A_fkey` FOREIGN KEY (`A`) REFERENCES `Film`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FilmToGenre` ADD CONSTRAINT `_FilmToGenre_B_fkey` FOREIGN KEY (`B`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ActorToFilm` ADD CONSTRAINT `_ActorToFilm_A_fkey` FOREIGN KEY (`A`) REFERENCES `Actor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ActorToFilm` ADD CONSTRAINT `_ActorToFilm_B_fkey` FOREIGN KEY (`B`) REFERENCES `Film`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
