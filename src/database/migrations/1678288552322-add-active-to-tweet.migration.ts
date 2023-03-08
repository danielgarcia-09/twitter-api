import { MigrationInterface, QueryRunner } from "typeorm";

export class addActiveToTweetMigration1678288552322 implements MigrationInterface {
    name = 'addActiveToTweetMigration1678288552322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" DROP COLUMN "active"`);
    }

}
