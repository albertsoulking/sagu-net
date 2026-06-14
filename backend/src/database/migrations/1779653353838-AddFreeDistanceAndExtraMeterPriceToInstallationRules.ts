import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFreeDistanceAndExtraMeterPriceToInstallationRules1779653353838 implements MigrationInterface {
    name = 'AddFreeDistanceAndExtraMeterPriceToInstallationRules1779653353838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`installation_rules\` ADD \`free_distance\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`installation_rules\` ADD \`extra_meter_price\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`installation_rules\` DROP COLUMN \`extra_meter_price\``);
        await queryRunner.query(`ALTER TABLE \`installation_rules\` DROP COLUMN \`free_distance\``);
    }

}
