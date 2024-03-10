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

const createUserData = {
  name: 'test',
  phone: '12345678900',
  password: '123456',
};

let userData = createUser();
let password = '123456';

describe('auth e2e', () => {
  let app: INestApplication;
  let db: DbType;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appBindGlobal(app);
    db = moduleFixture.get<DbType>(DB);

    await app.init();

    await cleanDB(db);
    await setupDBData(db);
  });

  afterEach(async () => {
    await cleanDB(db);
    await endDB();
    await app.close();
  });

  describe('signup', () => {
    it('should signup', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          ...createUserData,
        })
        .expect(201)
        .expect(({ body }) => {
          expect(body).toEqual(
            expect.objectContaining({
              token: expect.any(String),
              user: expect.objectContaining({
                username: createUserData.name,
                phone: createUserData.phone,
              }),
            }),
          );
        });
    });

    it('should not signup with existed phone', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          name: userData.username,
          phone: userData.phone,
          password,
        })
        .expect(400);
    });

    it('should not signup with invalid phone', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          name: 'test',
          phone: '123456789',
          password: '123456',
        })
        .expect(400);
    });
  });
});

async function setupDBData(db: DbType) {
  await db.insert(user).values({
    name: userData.username,
    phone: userData.phone,
    password: await argon2.hash(password),
  });
}
