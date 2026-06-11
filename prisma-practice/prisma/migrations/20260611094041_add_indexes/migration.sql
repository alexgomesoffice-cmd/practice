/*
  Warnings:

  - You are about to drop the `_categorytopost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_categorytopost` DROP FOREIGN KEY `_CategoryToPost_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytopost` DROP FOREIGN KEY `_CategoryToPost_B_fkey`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `categoryId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_categorytopost`;

-- CreateIndex
CREATE INDEX `Like_userId_idx` ON `Like`(`userId`);

-- CreateIndex
CREATE INDEX `Post_categoryId_idx` ON `Post`(`categoryId`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `comment` RENAME INDEX `Comment_postId_fkey` TO `Comment_postId_idx`;

-- RenameIndex
ALTER TABLE `like` RENAME INDEX `Like_postId_fkey` TO `Like_postId_idx`;

-- RenameIndex
ALTER TABLE `post` RENAME INDEX `Post_userId_fkey` TO `Post_userId_idx`;
