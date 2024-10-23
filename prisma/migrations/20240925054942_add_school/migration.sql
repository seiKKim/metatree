/*
  Warnings:

  - You are about to drop the column `mem_school` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Member` DROP COLUMN `mem_school`,
    ADD COLUMN `mem_school_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `School` (
    `school_id` INTEGER NOT NULL AUTO_INCREMENT,
    `school_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`school_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_mem_school_id_fkey` FOREIGN KEY (`mem_school_id`) REFERENCES `School`(`school_id`) ON DELETE SET NULL ON UPDATE CASCADE;
