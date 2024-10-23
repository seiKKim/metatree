/*
  Warnings:

  - Added the required column `mem_teacher_id` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Member` ADD COLUMN `mem_teacher_id` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `School` ADD COLUMN `address` VARCHAR(255) NOT NULL;
