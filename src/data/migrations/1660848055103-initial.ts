import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Initial1660848055103 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "todos",
                columns: [{
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    generationStrategy: "increment",
                }, {
                    name: "title",
                    type: "text",
                }, {
                    name: "completed",
                    type: "integer",
                }]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("todos");
    }

}
