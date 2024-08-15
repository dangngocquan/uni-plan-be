import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePlan1723656309866 implements MigrationInterface {
  name = 'CreateTablePlan1723656309866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "plan_course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "plan_id" uuid NOT NULL, "base_course_id" uuid NOT NULL, "name" character varying(255) NOT NULL, "four_point_grade" double precision, "letter_grade" character varying, "status" character varying(255) NOT NULL DEFAULT 'NOT_COMPLETED', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ae3ab78f71cad32cfbc21210f64" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "plan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "owner_id" uuid NOT NULL, "name" character varying(255) NOT NULL, "status" character varying(255) NOT NULL DEFAULT 'DRAFT', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "school" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "major" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_course" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "course" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "plan_course" ADD CONSTRAINT "FK_d50bfc7a1df5510eaea4e1cd8c8" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "plan_course" ADD CONSTRAINT "FK_f9fb059e5801550105d8491e92b" FOREIGN KEY ("base_course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "plan" ADD CONSTRAINT "FK_615eae16237bf472f35cdef1e1b" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "plan" DROP CONSTRAINT "FK_615eae16237bf472f35cdef1e1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "plan_course" DROP CONSTRAINT "FK_f9fb059e5801550105d8491e92b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "plan_course" DROP CONSTRAINT "FK_d50bfc7a1df5510eaea4e1cd8c8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_course" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "major" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "school" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`,
    );
    await queryRunner.query(`DROP TABLE "plan"`);
    await queryRunner.query(`DROP TABLE "plan_course"`);
  }
}
