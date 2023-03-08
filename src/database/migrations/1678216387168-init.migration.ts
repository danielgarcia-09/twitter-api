import { MigrationInterface, QueryRunner } from "typeorm";

export class initMigration1678216387168 implements MigrationInterface {
    name = 'initMigration1678216387168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tweets" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_19d841599ad812c558807aec76c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tweets"`);
    }

}
