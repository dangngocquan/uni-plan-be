import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAddFieldIDTableCOurseRelation1723399526485 implements MigrationInterface {
    name = 'UpdateAddFieldIDTableCOurseRelation1723399526485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`);
        await queryRunner.query(`ALTER TABLE "course_relation" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`);
        await queryRunner.query(`ALTER TABLE "group_course" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`);
        await queryRunner.query(`ALTER TABLE "major" ALTER COLUMN "order_index" SET DEFAULT extract(epoch from now())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "major" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`);
        await queryRunner.query(`ALTER TABLE "group_course" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`);
        await queryRunner.query(`ALTER TABLE "course_relation" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "school" ALTER COLUMN "order_index" SET DEFAULT EXTRACT(epoch FROM now())`);
    }

}
