import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreateAtField1660917298493 implements MigrationInterface {
    name = 'AddCreateAtField1660917298493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_todos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "completed" boolean NOT NULL, "createdAt" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_todos"("id", "title", "completed") SELECT "id", "title", "completed" FROM "todos"`);
        await queryRunner.query(`DROP TABLE "todos"`);
        await queryRunner.query(`ALTER TABLE "temporary_todos" RENAME TO "todos"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" RENAME TO "temporary_todos"`);
        await queryRunner.query(`CREATE TABLE "todos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "completed" boolean NOT NULL)`);
        await queryRunner.query(`INSERT INTO "todos"("id", "title", "completed") SELECT "id", "title", "completed" FROM "temporary_todos"`);
        await queryRunner.query(`DROP TABLE "temporary_todos"`);
    }

}
