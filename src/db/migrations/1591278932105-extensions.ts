import { MigrationInterface, QueryRunner } from 'typeorm';

export class Extensions1591278932105 implements MigrationInterface {
  name = 'Extensions1591278932105';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS pgcrypto;
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      `);
  }

  public async down(): Promise<void> {}
}
