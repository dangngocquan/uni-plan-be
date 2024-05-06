import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableGroupCourse1714711354326 implements MigrationInterface {
  name = 'UpdateTableGroupCourse1714711354326';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group_course" ADD CONSTRAINT "FK_1c66fa19d3f01b741a2e67359eb" FOREIGN KEY ("major_id") REFERENCES "major"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group_course" DROP CONSTRAINT "FK_1c66fa19d3f01b741a2e67359eb"`,
    );
  }
}
