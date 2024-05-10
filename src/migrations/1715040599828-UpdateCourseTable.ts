import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCourseTable1715040599828 implements MigrationInterface {
  name = 'UpdateCourseTable1715040599828';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_relation" DROP CONSTRAINT "FK_103abdefdbf14da6f3016b16233"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" RENAME COLUMN "prereq_course_id" TO "prereq_course_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" RENAME CONSTRAINT "PK_b67eb34d94dc1726a1bfe624d48" TO "PK_d7fe02441541b9fe0fa3132bdfb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" DROP CONSTRAINT "PK_d7fe02441541b9fe0fa3132bdfb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" ADD CONSTRAINT "PK_1f37b04c1e52b1514ae9519810d" PRIMARY KEY ("course_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" DROP COLUMN "prereq_course_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" ADD "prereq_course_name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_relation" DROP COLUMN "prereq_course_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" ADD "prereq_course_name" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" DROP CONSTRAINT "PK_1f37b04c1e52b1514ae9519810d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" ADD CONSTRAINT "PK_d7fe02441541b9fe0fa3132bdfb" PRIMARY KEY ("course_id", "prereq_course_name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" RENAME CONSTRAINT "PK_d7fe02441541b9fe0fa3132bdfb" TO "PK_b67eb34d94dc1726a1bfe624d48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" RENAME COLUMN "prereq_course_name" TO "prereq_course_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" ADD CONSTRAINT "FK_103abdefdbf14da6f3016b16233" FOREIGN KEY ("prereq_course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
