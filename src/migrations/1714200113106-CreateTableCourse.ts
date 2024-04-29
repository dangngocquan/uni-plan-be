import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCourse1714200113106 implements MigrationInterface {
  name = 'CreateTableCourse1714200113106';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "course_relation" ("course_id" uuid NOT NULL, "prereq_course_id" uuid NOT NULL, CONSTRAINT "PK_b67eb34d94dc1726a1bfe624d48" PRIMARY KEY ("course_id", "prereq_course_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "credits" bigint NOT NULL, "group_id" uuid NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" ADD CONSTRAINT "FK_1f37b04c1e52b1514ae9519810d" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" ADD CONSTRAINT "FK_103abdefdbf14da6f3016b16233" FOREIGN KEY ("prereq_course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "course" ADD CONSTRAINT "FK_e5ff1032679363daced4f770e4f" FOREIGN KEY ("group_id") REFERENCES "group_course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course" DROP CONSTRAINT "FK_e5ff1032679363daced4f770e4f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" DROP CONSTRAINT "FK_103abdefdbf14da6f3016b16233"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_relation" DROP CONSTRAINT "FK_1f37b04c1e52b1514ae9519810d"`,
    );
    await queryRunner.query(`DROP TABLE "course"`);
    await queryRunner.query(`DROP TABLE "course_relation"`);
  }
}
