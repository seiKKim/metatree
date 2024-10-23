/*
  Warnings:

  - You are about to drop the column `mem_level` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `mem_phone` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Member` DROP COLUMN `mem_level`,
    DROP COLUMN `mem_phone`,
    ADD COLUMN `mem_class` VARCHAR(50) NULL,
    ADD COLUMN `mem_grade` INTEGER NULL,
    ADD COLUMN `mem_number` VARCHAR(50) NULL,
    ADD COLUMN `mem_school` VARCHAR(255) NULL;
