import { course, user, userProgress } from '@earthworm/schema';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as argon2 from 'argon2';
import * as request from 'supertest';
import { createFirstCourse } from '../../../test/fixture/course';
import { createUser } from '../../../test/fixture/user';
import { cleanDB } from '../../../test/helper/utils';
import { AppModule } from '../../app/app.module';
import { appGlobalMiddleware } from '../../app/useGlobal';
import { endDB } from '../../common/db';
import { DB, DbType } from '../../global/providers/db.provider';

let userData = createUser();
let password = '123456';
const firstCourse = createFirstCourse();
describe('game e2e', () => {
  let app: INestApplication;
  let db: DbType;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appGlobalMiddleware(app);
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

  it('should start game', async () => {
    const res = await request(app.getHttpServer()).post('/auth/login').send({
      phone: userData.phone,
      password,
    });
    const token = res.body.token;
    await request(app.getHttpServer())
      .post('/game/start')
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect(({ body }) => {
        expect(body.cId).toBe(1);
      });
  });

  it('should not start game if not logged in', async () => {
    await request(app.getHttpServer()).post('/game/start').expect(401);
  });
});

async function setupDBData(db: DbType) {
  const [res] = await db.insert(user).values({
    name: userData.username,
    phone: userData.phone,
    password: await argon2.hash(password),
  });

  await db.insert(userProgress).values({
    courseId: 1,
    userId: res.insertId,
  });

  await db.insert(course).values(firstCourse);
}
