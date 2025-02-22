/*
  Warnings:

  - You are about to drop the column `assignedUserId` on the `issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_assignedUserId_fkey`;

-- DropIndex
DROP INDEX `Issue_assignedUserId_fkey` ON `issue`;

-- AlterTable
ALTER TABLE `issue` DROP COLUMN `assignedUserId`,
    ADD COLUMN `assignedToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
