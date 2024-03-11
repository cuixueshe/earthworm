import { user } from '@earthworm/shared';
import { createUser } from '../../../test/fixture/user';
import { DB, DbType } from '../../global/providers/db.provider';
import * as argon2 from 'argon2';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app/app.module';
import { cleanDB } from '../../../test/helper/utils';
import { endDB } from '../../common/db';
import { appBindGlobal } from '../../app/useGlobal';
import { Redis } from 'ioredis';
import { getRedisConnectionToken } from '@nestjs-modules/ioredis';

let userData = createUser();
let password = '123456';
describe('rank e2e', () => {
  let app: INestApplication;
  let db: DbType;
  let redis: Redis;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appBindGlobal(app);
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
      .get('/rank/progress')
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
    const res = await request(app.getHttpServer()).post('/auth/login').send({
      phone: userData.phone,
      password,
    });

    const token = res.body.token;
    await request(app.getHttpServer())
      .get('/rank/progress')
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
