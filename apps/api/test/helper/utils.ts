import { JwtModule } from '@nestjs/jwt';
import { sql } from 'drizzle-orm';
import { DbType } from 'src/global/providers/db.provider';
import { GlobalModule } from '../../src/global/global.module';
import { fetchToken } from '../../src/services/logtoService';
import { MockRedisModule } from './mockRedis';

export async function cleanDB(db: DbType) {
  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0;`);

  await db.execute(sql`TRUNCATE TABLE courses;`);
  await db.execute(sql`TRUNCATE TABLE statements;`);
  await db.execute(sql`TRUNCATE TABLE \`user-progress\`;`);
  await db.execute(sql`TRUNCATE TABLE \`course-history\`;`);

  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1;`);
}

export async function startDB(db: DbType) {
  await db.execute(sql`START TRANSACTION;`);
}

export async function endDB(db: DbType) {
  await db.execute(sql`ROLLBACK;`);
}

export async function signin() {
  const token = await fetchToken();
  return token;
}

export const testImportModules = [
  MockRedisModule,
  GlobalModule,
  JwtModule.register({
    secret: process.env.SECRET,
    signOptions: { expiresIn: '7d' },
  }),
];
