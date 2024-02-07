import { DbType } from 'src/global/providers/db.provider';
import { sql } from 'drizzle-orm';

export async function cleanDB(db: DbType) {
  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0;`);

  await db.execute(sql`TRUNCATE TABLE courses;`);
  await db.execute(sql`TRUNCATE TABLE statements;`);

  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1;`);
}

export async function startDB(db: DbType) {
  await db.execute(sql`START TRANSACTION;`);
}

export async function endDB(db: DbType) {
  await db.execute(sql`ROLLBACK;`);
}
