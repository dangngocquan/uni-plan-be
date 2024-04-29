import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableGradeConversion1714372155926
  implements MigrationInterface
{
  name = 'UpdateTableGradeConversion1714372155926';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "grade_conversion" DROP COLUMN "min_ten_point_grade"`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade_conversion" ADD "from_ten_point_grade" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade_conversion" ADD "to_ten_point_grade" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade_conversion" ADD "label_ten_point_grade" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "grade_conversion" DROP COLUMN "label_ten_point_grade"`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade_conversion" DROP COLUMN "to_ten_point_grade"`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade_conversion" DROP COLUMN "from_ten_point_grade"`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade_conversion" ADD "min_ten_point_grade" double precision`,
    );
  }
}
