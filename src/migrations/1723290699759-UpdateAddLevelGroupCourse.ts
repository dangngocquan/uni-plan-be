import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAddLevelGroupCourse1723290699759 implements MigrationInterface {
    name = 'UpdateAddLevelGroupCourse1723290699759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_course" ADD "level" bigint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`);
        await queryRunner.query(`ALTER TABLE "group_course" ALTER COLUMN "min_groups" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "group_course" ALTER COLUMN "min_groups" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "group_course" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`);
        await queryRunner.query(`ALTER TABLE "major" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`);
        await queryRunner.query(`ALTER TABLE "school" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`);
        await queryRunner.query(`ALTER TABLE "major" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`);
        await queryRunner.query(`ALTER TABLE "group_course" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`);
        await queryRunner.query(`ALTER TABLE "group_course" ALTER COLUMN "min_groups" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "group_course" ALTER COLUMN "min_groups" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`);
        await queryRunner.query(`ALTER TABLE "group_course" DROP COLUMN "level"`);
    }

}
