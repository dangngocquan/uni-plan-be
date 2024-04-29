import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableGroupCourse1714191572948 implements MigrationInterface {
  name = 'CreateTableGroupCourse1714191572948';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "group_course_relation" ("group_id" uuid NOT NULL, "parent_group_id" uuid NOT NULL, CONSTRAINT "PK_7b2c6f414e5e0adf6c0ff516e5f" PRIMARY KEY ("group_id", "parent_group_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "group_course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying(255), "min_credits" bigint, "min_courses" bigint, "min_groups" bigint, "major_id" uuid NOT NULL, "title" character varying(255), "description" character varying(255), CONSTRAINT "PK_f644c24b387124a3fa6ff89f0f1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_course_relation" ADD CONSTRAINT "FK_f40a0e554e37a234634eb01dfd9" FOREIGN KEY ("group_id") REFERENCES "group_course"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_course_relation" ADD CONSTRAINT "FK_63c9ebeb6ec39130ee072d71cf3" FOREIGN KEY ("parent_group_id") REFERENCES "group_course"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group_course_relation" DROP CONSTRAINT "FK_63c9ebeb6ec39130ee072d71cf3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_course_relation" DROP CONSTRAINT "FK_f40a0e554e37a234634eb01dfd9"`,
    );
    await queryRunner.query(`DROP TABLE "group_course"`);
    await queryRunner.query(`DROP TABLE "group_course_relation"`);
  }
}
