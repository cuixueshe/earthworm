import { INestApplication } from '@nestjs/common';
import { DbType } from 'src/global/providers/db.provider';
import { sql } from 'drizzle-orm';
import * as request from 'supertest';

export async function cleanDB(db: DbType) {
  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0;`);

  await db.execute(sql`TRUNCATE TABLE courses;`);
  await db.execute(sql`TRUNCATE TABLE statements;`);
  await db.execute(sql`TRUNCATE TABLE users;`);

  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1;`);
}

export async function startDB(db: DbType) {
  await db.execute(sql`START TRANSACTION;`);
}

export async function endDB(db: DbType) {
  await db.execute(sql`ROLLBACK;`);
}

export async function signup(
  app: INestApplication,
): Promise<{ token: string }> {
  const res = await request(app.getHttpServer()).post('/auth/signup').send({
    name: 'testuser',
    password: 'testpass',
    phone: '13813832182',
  });

  return {
    token: res.body.token,
  };
}
