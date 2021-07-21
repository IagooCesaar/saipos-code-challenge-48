import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTaskHistory1626875791597 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "TaskHistory",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "user_id", type: "uuid" },
          { name: "task_id", type: "uuid" },
          { name: "done", type: "boolean" },
          { name: "occurrence", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            name: "FK_TASKHISTORY_USER",
            columnNames: ["user_id"],
            referencedTableName: "Users",
            referencedColumnNames: ["id"],
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
          },
          {
            name: "FK_TASKHISTORY_TASK",
            columnNames: ["task_id"],
            referencedTableName: "Tasks",
            referencedColumnNames: ["id"],
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("TaskHistory");
  }
}
