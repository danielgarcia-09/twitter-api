import { MigrationInterface, QueryRunner } from "typeorm";

export class removeActiveFromTweetEntityMigration1685564245757 implements MigrationInterface {
    name = 'removeActiveFromTweetEntityMigration1685564245757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" DROP COLUMN "active"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" ADD "active" boolean NOT NULL DEFAULT true`);
    }

}
