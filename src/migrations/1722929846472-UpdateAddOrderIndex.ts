import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAddOrderIndex1722929846472 implements MigrationInterface {
  name = 'UpdateAddOrderIndex1722929846472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course" ADD "order_index" double precision NOT NULL DEFAULT extract(epoch from now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "group_course" ADD "order_index" double precision NOT NULL DEFAULT extract(epoch from now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "major" ADD "order_index" double precision NOT NULL DEFAULT extract(epoch from now())`,
    );
    await queryRunner.query(
      `ALTER TABLE "school" ADD "order_index" double precision NOT NULL DEFAULT extract(epoch from now())`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "order_index"`);
    await queryRunner.query(`ALTER TABLE "major" DROP COLUMN "order_index"`);
    await queryRunner.query(
      `ALTER TABLE "group_course" DROP COLUMN "order_index"`,
    );
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "order_index"`);
  }
}
