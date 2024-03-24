import { user } from '@earthworm/schema';
import { getRedisConnectionToken } from '@nestjs-modules/ioredis';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as argon2 from 'argon2';
import { Redis } from 'ioredis';
import * as request from 'supertest';
import { createUser } from '../../../test/fixture/user';
import { cleanDB, login } from '../../../test/helper/utils';
import { AppModule } from '../../app/app.module';
import { appGlobalMiddleware } from '../../app/useGlobal';
import { endDB } from '../../common/db';
import { DB, DbType } from '../../global/providers/db.provider';

const userData = createUser();
const password = '123456';
describe('rank e2e', () => {
  let app: INestApplication;
  let db: DbType;
  let redis: Redis;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appGlobalMiddleware(app);
    db = moduleFixture.get<DbType>(DB);
    redis = moduleFixture.get<Redis>(getRedisConnectionToken());

    await app.init();

    await cleanDB(db);
    await setupDBData(db, redis);
  });

  afterEach(async () => {
    await cleanDB(db);
    await endDB();
    await app.close();
  });

  it('should get rank', async () => {
    await request(app.getHttpServer())
      .get('/rank/progress/weekly')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            list: expect.arrayContaining([
              expect.objectContaining({
                username: userData.username,
                count: '1',
              }),
            ]),
          }),
        );
      });
  });

  it('should get rank with login', async () => {
    const { token } = await login(app, { phone: userData.phone, password });

    await request(app.getHttpServer())
      .get('/rank/progress/weekly')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            self: expect.objectContaining({
              username: userData.username,
              count: '1',
              rank: 0,
            }),
          }),
        );
      });
  });
});

async function setupDBData(db: DbType, redis: Redis) {
  const [res] = await db.insert(user).values({
    name: userData.username,
    phone: userData.phone,
    password: await argon2.hash(password),
  });
  const userId = res.insertId;
  const member = `${userId}-${userData.username}`;
  const FINISH_COUNT_KEY = `user:finishCount`;
  await redis.zadd(FINISH_COUNT_KEY, 1, member);
}
