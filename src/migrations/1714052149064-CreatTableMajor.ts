import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatTableMajor1714052149064 implements MigrationInterface {
    name = 'CreatTableMajor1714052149064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "major" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "school_id" uuid NOT NULL, CONSTRAINT "PK_00341ff87e17ae50751c5da05ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "major" ADD CONSTRAINT "FK_35265b5425355fba8efdc21c0c7" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "major" DROP CONSTRAINT "FK_35265b5425355fba8efdc21c0c7"`);
        await queryRunner.query(`DROP TABLE "major"`);
    }

}
