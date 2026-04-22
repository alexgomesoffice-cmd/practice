/*
  Warnings:

  - The primary key for the `movie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imageUrl` on the `movie` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `movie` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `movie` table. All the data in the column will be lost.
  - Added the required column `image` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movie` DROP PRIMARY KEY,
    DROP COLUMN `imageUrl`,
    DROP COLUMN `rating`,
    DROP COLUMN `releaseDate`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
