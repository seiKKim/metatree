/*
  Warnings:

  - You are about to drop the column `mem_teacher_id` on the `Member` table. All the data in the column will be lost.
  - Added the required column `mem_teacher_number` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Member` DROP COLUMN `mem_teacher_id`,
    ADD COLUMN `mem_teacher_number` VARCHAR(50) NOT NULL;
