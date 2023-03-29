import { MigrationInterface, QueryRunner } from "typeorm";

export class addUuidToEntitiesMigration1679501501408 implements MigrationInterface {
    name = 'addUuidToEntitiesMigration1679501501408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "uuid"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "uuid"`);
        await queryRunner.query(`ALTER TABLE "tweets" DROP COLUMN "uuid"`);
    }

}
