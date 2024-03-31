import { INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { sql } from 'drizzle-orm';
import { DbType } from 'src/global/providers/db.provider';
import { UserEntity } from 'src/user/user.decorators';
import * as request from 'supertest';
import { GlobalModule } from '../../src/global/global.module';
import { MockRedisModule } from './mockRedis';

export async function cleanDB(db: DbType) {
  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0;`);

  await db.execute(sql`TRUNCATE TABLE courses;`);
  await db.execute(sql`TRUNCATE TABLE statements;`);
  await db.execute(sql`TRUNCATE TABLE users;`);
  await db.execute(sql`TRUNCATE TABLE \`user-learn-record\`;`);

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
  user?: UserEntity,
): Promise<{ token: string }> {
  const userInfo = user || {
    name: 'testuser',
    password: 'testpass',
    phone: '13813832182',
  };

  const res = await request(app.getHttpServer())
    .post('/auth/signup')
    .send(userInfo);

  return {
    token: res.body.token,
  };
}

export async function login(
  app: INestApplication,
  { phone, password }: { phone: string; password: string },
): Promise<{ token: string }> {
  const res = await request(app.getHttpServer()).post('/auth/login').send({
    phone,
    password,
  });

  return {
    token: res.body.token,
  };
}

export const testImportModules = [
  MockRedisModule,
  GlobalModule,
  JwtModule.register({
    secret: process.env.SECRET,
    signOptions: { expiresIn: '7d' },
  }),
];
