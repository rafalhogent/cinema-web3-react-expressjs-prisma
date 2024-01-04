/*
  Warnings:

  - You are about to drop the column `prijs` on the `Ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[showtimeId,seatNr]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `prijs`,
    ADD COLUMN `price` DOUBLE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Ticket_showtimeId_seatNr_key` ON `Ticket`(`showtimeId`, `seatNr`);
