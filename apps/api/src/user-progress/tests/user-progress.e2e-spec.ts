import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

import { course, userProgress } from "@earthworm/schema";
import { createFirstCourse, createSecondCourse } from "../../../test/fixture/course";
import { getTokenOwner } from "../../../test/fixture/user";
import { cleanDB, signin } from "../../../test/helper/utils";
import { AppModule } from "../../app/app.module";
import { appGlobalMiddleware } from "../../app/useGlobal";
import { endDB } from "../../common/db";
import { DB, DbType } from "../../global/providers/db.provider";

const firstCourse = createFirstCourse();
const secondCourse = createSecondCourse();

describe("user-progress e2e", () => {
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

    token = await signin();
  });

  afterEach(async () => {
    await cleanDB(db);
    await endDB();
    await app.close();
  });

  it("should find user progress", async () => {
    const res = await request(app.getHttpServer())
      .get("/user-progress")
      .set("Authorization", `Bearer ${token}`);

    expect(res.body.courseId).toBe(firstCourse.id);
  });

  it("should update user progress", async () => {
    await request(app.getHttpServer())
      .put("/user-progress")
      .set("Authorization", `Bearer ${token}`)
      .send({
        courseId: secondCourse.id,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.courseId).toBe(secondCourse.id);
      });
  });
});

async function setupDBData(db: DbType) {
  await db.insert(course).values(firstCourse);
  await db.insert(course).values(secondCourse);
  await db.insert(userProgress).values({
    courseId: firstCourse.id,
    userId: getTokenOwner(),
  });
}
