import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCourseRelationTable1715357237233
  implements MigrationInterface
{
  name = 'UpdateCourseRelationTable1715357237233';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_relation" DROP COLUMN "prereq_course_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" ADD "id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" DROP CONSTRAINT "PK_1f37b04c1e52b1514ae9519810d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" ADD CONSTRAINT "PK_88d489fb84c5244ab5024814d8f" PRIMARY KEY ("course_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" ADD "prereq_course_code" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" DROP CONSTRAINT "FK_1f37b04c1e52b1514ae9519810d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" DROP CONSTRAINT "PK_88d489fb84c5244ab5024814d8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" ADD CONSTRAINT "PK_00e4b6cbece746a307717aaa51d" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" ADD CONSTRAINT "FK_1f37b04c1e52b1514ae9519810d" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_relation" DROP CONSTRAINT "FK_1f37b04c1e52b1514ae9519810d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" DROP CONSTRAINT "PK_00e4b6cbece746a307717aaa51d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" ADD CONSTRAINT "PK_88d489fb84c5244ab5024814d8f" PRIMARY KEY ("course_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" ADD CONSTRAINT "FK_1f37b04c1e52b1514ae9519810d" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" DROP COLUMN "prereq_course_code"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" DROP CONSTRAINT "PK_88d489fb84c5244ab5024814d8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" ADD CONSTRAINT "PK_1f37b04c1e52b1514ae9519810d" PRIMARY KEY ("course_id")`,
    );
    await queryRunner.query(`ALTER TABLE "course_relation" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "course_relation" ADD "prereq_course_name" character varying NOT NULL`,
    );
  }
}
