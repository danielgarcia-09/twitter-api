import { MigrationInterface, QueryRunner } from "typeorm";

export class addingBaseEntityToExistingMigration1678284216136 implements MigrationInterface {
    name = 'addingBaseEntityToExistingMigration1678284216136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "tweets" DROP COLUMN "deletedAt"`);
    }

}
