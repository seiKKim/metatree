-- CreateTable
CREATE TABLE `ClassGroup` (
    `group_id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(255) NOT NULL,
    `school_id` INTEGER NOT NULL,

    PRIMARY KEY (`group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GroupMembers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GroupMembers_AB_unique`(`A`, `B`),
    INDEX `_GroupMembers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClassGroup` ADD CONSTRAINT `ClassGroup_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`school_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupMembers` ADD CONSTRAINT `_GroupMembers_A_fkey` FOREIGN KEY (`A`) REFERENCES `ClassGroup`(`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupMembers` ADD CONSTRAINT `_GroupMembers_B_fkey` FOREIGN KEY (`B`) REFERENCES `Member`(`mem_id`) ON DELETE CASCADE ON UPDATE CASCADE;
