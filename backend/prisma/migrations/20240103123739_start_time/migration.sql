/*
  Warnings:

  - You are about to drop the column `start` on the `Showtime` table. All the data in the column will be lost.
  - Added the required column `startTime` to the `Showtime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Showtime` DROP COLUMN `start`,
    ADD COLUMN `startTime` DATETIME(3) NOT NULL;
