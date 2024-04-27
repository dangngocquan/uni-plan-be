import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableGradeConversion1714206640943
  implements MigrationInterface
{
  name = 'CreateTableGradeConversion1714206640943';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "grade_conversion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "min_ten_point_grade" double precision, "four_point_grade" double precision, "letter_grade" character varying, "conversion_table_id" uuid NOT NULL, CONSTRAINT "PK_f8acfb5a415915b22707443d0e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "grade_conversion_table" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_25f9f1a28bcd16d82fd994e43ae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade_conversion" ADD CONSTRAINT "FK_bf38aa63b26510e7c94062cd4b4" FOREIGN KEY ("conversion_table_id") REFERENCES "grade_conversion_table"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "grade_conversion" DROP CONSTRAINT "FK_bf38aa63b26510e7c94062cd4b4"`,
    );
    await queryRunner.query(`DROP TABLE "grade_conversion_table"`);
    await queryRunner.query(`DROP TABLE "grade_conversion"`);
  }
}
