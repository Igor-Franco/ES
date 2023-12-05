import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProjectUserRelation1697329108539
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "project_members_user",
        columns: [
          {
            name: "projectId",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "userId",
            type: "uuid",
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["projectId"],
            referencedColumnNames: ["id"],
            referencedTableName: "projects",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("project_members_user");
  }
}
