import { MigrationInterface, QueryRunner } from "typeorm";

export class addActiveColumnToUserMigration1679345975615 implements MigrationInterface {
    name = 'addActiveColumnToUserMigration1679345975615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "active" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`);
    }

}
