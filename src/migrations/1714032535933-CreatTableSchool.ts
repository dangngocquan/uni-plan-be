import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatTableSchool1714032535933 implements MigrationInterface {
  name = 'CreatTableSchool1714032535933';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "school" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255), CONSTRAINT "PK_57836c3fe2f2c7734b20911755e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "school"`);
  }
}
