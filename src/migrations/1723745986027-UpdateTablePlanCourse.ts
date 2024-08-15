import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTablePlanCourse1723745986027 implements MigrationInterface {
  name = 'UpdateTablePlanCourse1723745986027';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "plan_course" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "course" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_course" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "major" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "school" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "major" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_course" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "course" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "plan_course" ADD "name" character varying(255) NOT NULL`,
    );
  }
}
