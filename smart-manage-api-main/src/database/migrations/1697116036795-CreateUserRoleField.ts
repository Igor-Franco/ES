import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserRoleField1697116036795 implements MigrationInterface {
  name = "CreateUserRoleField1697116036795";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('frontend', 'backend', 'fullstack', 'manager', 'productOwner')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'fullstack'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
