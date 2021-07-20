import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTasks1626804361192 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Tasks",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "user_id", type: "uuid" },
          { name: "description", type: "varchar" },
          { name: "done", type: "boolean" },
          { name: "created_at", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            name: "FK_TASK_USER",
            columnNames: ["user_id"],
            referencedTableName: "Users",
            referencedColumnNames: ["id"],
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Tasks");
  }
}
