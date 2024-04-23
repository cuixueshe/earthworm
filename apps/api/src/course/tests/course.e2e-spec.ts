import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

import { course, statement } from "@earthworm/schema";
import { createFirstCourse, createSecondCourse } from "../../../test/fixture/course";
import { createStatement } from "../../../test/fixture/statement";
import { cleanDB, signin } from "../../../test/helper/utils";
import { AppModule } from "../../app/app.module";
import { appGlobalMiddleware } from "../../app/useGlobal";
import { endDB } from "../../common/db";
import { DB, DbType } from "../../global/providers/db.provider";

const firstCourse = createFirstCourse();
const secondCourse = createSecondCourse();

describe("course e2e", () => {
  let app: INestApplication;
  let db: DbType;
  let token: string;

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

    token = await signin(moduleFixture);
  });

  afterEach(async () => {
    await cleanDB(db);
    await endDB();
    await app.close();
  });

  it("should fetch superhero details", async () => {
    return request(app.getHttpServer())
      .get("/courses/1")
      .set("Authorization", `Bearer ${token}`)
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

  it("should allow trying a course without authentication", async () => {
    await request(app.getHttpServer())
      .get("/courses/try")
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

  it("should get next course", async () => {
    await request(app.getHttpServer())
      .get("/courses/1/next")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            id: secondCourse.id,
            title: secondCourse.title,
          }),
        );
      });
  });
});

async function setupDBData(db: DbType) {
  await db.insert(course).values(firstCourse);
  await db.insert(course).values(secondCourse);

  await db.insert(statement).values({
    ...createStatement(firstCourse.id),
  });
}
