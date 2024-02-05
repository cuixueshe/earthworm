import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app/app.module';
import { INestApplication } from '@nestjs/common';
import { cleanDB } from '../../../tests/helper/utils';
import { DbType, DB } from '../../global/providers/db.provider';
import {
  createFirstCourse,
  createSecondCourse,
} from '../../../tests/fixture/course';
import { createStatement } from '../../../tests/fixture/statement';
import { course, statement } from '@earthworm/shared';
import * as request from 'supertest';

const firstCourse = createFirstCourse();

describe('course e2e', () => {
  let app: INestApplication;
  let db: DbType;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    db = moduleFixture.get<DbType>(DB);

    await app.init();

    await cleanDB(db);
    await setupDBData(db);
  });

  it('should fetch superhero details', () => {
    return request(app.getHttpServer())
      .get('/courses/1')
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
