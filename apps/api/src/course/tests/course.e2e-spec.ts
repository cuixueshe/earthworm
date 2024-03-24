import { course, statement } from '@earthworm/schema';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import {
  createFirstCourse,
  createSecondCourse,
} from '../../../test/fixture/course';
import { createStatement } from '../../../test/fixture/statement';
import { cleanDB, signup } from '../../../test/helper/utils';
import { AppModule } from '../../app/app.module';
import { endDB } from '../../common/db';
import { DB, DbType } from '../../global/providers/db.provider';

const firstCourse = createFirstCourse();

describe('course e2e', () => {
  let app: INestApplication;
  let db: DbType;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    db = moduleFixture.get<DbType>(DB);

    await app.init();

    await cleanDB(db);
    await setupDBData(db);

    const signupBody = await signup(app);
    token = signupBody.token;
  });

  afterEach(async () => {
    await cleanDB(db);
    await endDB();
    await app.close();
  });

  it('should fetch superhero details', async () => {
    return request(app.getHttpServer())
      .get('/courses/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            id: firstCourse.id,
            title: firstCourse.title,
          }),
        );
        expect(body.statements.length).toBeGreaterThan(0);
      });
  });

  it('should allow trying a course without authentication', async () => {
    await request(app.getHttpServer())
      .get('/courses/try')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            id: firstCourse.id,
            title: firstCourse.title,
          }),
        );
        expect(body.statements.length).toBeGreaterThan(0);
      });
  });
});

async function setupDBData(db: DbType) {
  await db.insert(course).values(firstCourse);
  await db.insert(course).values(createSecondCourse());

  await db.insert(statement).values({
    ...createStatement(firstCourse.id),
  });
}
