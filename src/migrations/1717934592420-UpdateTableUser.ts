import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableUser1717934592420 implements MigrationInterface {
  name = 'UpdateTableUser1717934592420';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "avatar" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
  }
}
