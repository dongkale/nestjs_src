import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIndexToEmailForUsers1605444883376 implements MigrationInterface {
    name = 'AddIndexToEmailForUsers1605444883376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
    }

}
