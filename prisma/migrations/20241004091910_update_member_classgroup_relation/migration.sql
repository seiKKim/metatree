/*
  Warnings:

  - You are about to drop the `_GroupMembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_GroupMembers` DROP FOREIGN KEY `_GroupMembers_A_fkey`;

-- DropForeignKey
ALTER TABLE `_GroupMembers` DROP FOREIGN KEY `_GroupMembers_B_fkey`;

-- DropTable
DROP TABLE `_GroupMembers`;

-- CreateTable
CREATE TABLE `ClassGroupMember` (
    `memberId` INTEGER NOT NULL,
    `groupId` INTEGER NOT NULL,

    PRIMARY KEY (`memberId`, `groupId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClassGroupMember` ADD CONSTRAINT `ClassGroupMember_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`mem_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassGroupMember` ADD CONSTRAINT `ClassGroupMember_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `ClassGroup`(`group_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
