/*
  Warnings:

  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassGroupMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `School` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseGroups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `ClassGroup` DROP FOREIGN KEY `ClassGroup_school_id_fkey`;

-- DropForeignKey
ALTER TABLE `ClassGroupMember` DROP FOREIGN KEY `ClassGroupMember_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `ClassGroupMember` DROP FOREIGN KEY `ClassGroupMember_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `Member` DROP FOREIGN KEY `Member_mem_school_id_fkey`;

-- DropForeignKey
ALTER TABLE `_CourseGroups` DROP FOREIGN KEY `_CourseGroups_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CourseGroups` DROP FOREIGN KEY `_CourseGroups_B_fkey`;

-- AlterTable
ALTER TABLE `Member` ADD COLUMN `mem_schoolname` VARCHAR(255) NULL;

-- DropTable
DROP TABLE `Attendance`;

-- DropTable
DROP TABLE `ClassGroup`;

-- DropTable
DROP TABLE `ClassGroupMember`;

-- DropTable
DROP TABLE `Course`;

-- DropTable
DROP TABLE `School`;

-- DropTable
DROP TABLE `_CourseGroups`;
