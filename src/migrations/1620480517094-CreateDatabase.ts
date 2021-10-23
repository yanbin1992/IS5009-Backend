import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1620480517094 implements MigrationInterface {
    name = 'CreateDatabase1620480517094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `post` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `title` varchar(255) NOT NULL, `text` text NOT NULL, `photo` varchar(255) NULL, `accountId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `account` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `email` varchar(300) NOT NULL, `permissions` text NULL, `password` text NOT NULL, UNIQUE INDEX `IDX_4c8f96ccf523e9a3faefd5bdd4` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_f219a87fd8c020d3bb6527c9420` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_f219a87fd8c020d3bb6527c9420`");
        await queryRunner.query("DROP INDEX `IDX_4c8f96ccf523e9a3faefd5bdd4` ON `account`");
        await queryRunner.query("DROP TABLE `account`");
        await queryRunner.query("DROP TABLE `post`");
    }

}
