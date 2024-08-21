import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAddFieldTypeGradeConversion1724088182735 implements MigrationInterface {
    name = 'UpdateAddFieldTypeGradeConversion1724088182735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grade_conversion_table" ADD "type" character varying(255) NOT NULL DEFAULT 'GRADE'`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`);
        await queryRunner.query(`ALTER TABLE "group_course" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`);
        await queryRunner.query(`ALTER TABLE "major" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`);
        await queryRunner.query(`ALTER TABLE "school" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`);
        await queryRunner.query(`ALTER TABLE "major" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`);
        await queryRunner.query(`ALTER TABLE "group_course" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`);
        await queryRunner.query(`ALTER TABLE "grade_conversion_table" DROP COLUMN "type"`);
    }

}
