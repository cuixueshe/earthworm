import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm";
import * as request from "supertest";

import { userCourseProgress } from "@earthworm/schema";
import { insertUserCourseProgress } from "../../../test/fixture/db";
import { cleanDB, signin } from "../../../test/helper/utils";
import { AppModule } from "../../app/app.module";
import { appGlobalMiddleware } from "../../app/useGlobal";
import { endDB } from "../../common/db";
import { DB, DbType } from "../../global/providers/db.provider";

describe("user-progress e2e", () => {
  let app: INestApplication;
  let db: DbType;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appGlobalMiddleware(app);
    db = moduleFixture.get<DbType>(DB);
    await app.init();
    token = await signin(moduleFixture);
  });

  afterEach(async () => {
    await cleanDB(db);
  });

  afterAll(async () => {
    await endDB();
    await app.close();
  });

  it("get: /user-course-progress/recent-course-packs", async () => {
    const coursePackIdFirst = createId();
    const courseIdFirst = createId();
    const coursePackIdSecond = createId();
    const courseIdSecond = createId();
    const userId = createId();
    await insertUserCourseProgress(db, coursePackIdFirst, courseIdFirst, 0, userId);
    await insertUserCourseProgress(db, coursePackIdSecond, courseIdSecond, 10, userId);

    await request(app.getHttpServer())
      .get("/user-course-progress/recent-course-packs")
      .set("Authorization", `Bearer ${token}`)
      .query({ userId })
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toBe(2);
      });
  });

  it("put: /user-course-progress", async () => {
    const coursePackId = createId();
    const courseId = createId();
    await insertUserCourseProgress(db, coursePackId, courseId, 1);

    await request(app.getHttpServer())
      .put("/user-course-progress")
      .send({
        courseId,
        coursePackId,
        statementIndex: 10,
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect(async () => {
        const result = await db.query.userCourseProgress.findFirst({
          where: and(
            eq(userCourseProgress.coursePackId, coursePackId),
            eq(userCourseProgress.courseId, courseId),
          ),
        });

        expect(result).toBeTruthy();
      });
  });
});
