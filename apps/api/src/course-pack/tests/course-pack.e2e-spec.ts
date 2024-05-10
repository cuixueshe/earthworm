import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

import { insertCourse, insertCoursePack, insertStatement } from "../../../test/fixture/db";
import { cleanDB, signin } from "../../../test/helper/utils";
import { AppModule } from "../../app/app.module";
import { appGlobalMiddleware } from "../../app/useGlobal";
import { endDB } from "../../common/db";
import { DB, DbType } from "../../global/providers/db.provider";

describe("course-pack e2e", () => {
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

    token = await signin(moduleFixture);
  });

  afterEach(async () => {
    await cleanDB(db);
    await endDB();
    await app.close();
  });

  it("get: /course-pack", async () => {
    await insertCoursePack(db);
    return request(app.getHttpServer())
      .get("/course-pack")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toBe(1);
      });
  });

  it("get: /course-pack/:coursePackId", async () => {
    const { id: coursePackId } = await insertCoursePack(db);
    await insertCourse(db, coursePackId);
    await insertCourse(db, coursePackId);

    return request(app.getHttpServer())
      .get(`/course-pack/${coursePackId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveProperty("courses");
        expect(body).toHaveProperty("order");
        expect(body).toHaveProperty("title");
      });
  });

  it("get: /course-pack/:coursePackId/courses/:courseId", async () => {
    const { id: coursePackId } = await insertCoursePack(db);
    const { id: courseId } = await insertCourse(db, coursePackId);
    await insertStatement(db, courseId, 1);
    await insertStatement(db, courseId, 2);

    return request(app.getHttpServer())
      .get(`/course-pack/${coursePackId}/courses/${courseId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveProperty("coursePackId");
        expect(body).toHaveProperty("order");
        expect(body).toHaveProperty("statements");
      });
  });

  it("get: /course-pack/:coursePackId/courses/:courseId/next", async () => {
    const { id: coursePackId } = await insertCoursePack(db);

    const { id: courseId } = await insertCourse(db, coursePackId, {
      order: 1,
      title: "第一课",
    });
    const { id: courseIdNext } = await insertCourse(db, coursePackId, {
      order: 2,
      title: "第二课",
    });

    return request(app.getHttpServer())
      .get(`/course-pack/${coursePackId}/courses/${courseId}/next`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toBe(courseIdNext);
      });
  });

  it("post: /course-pack/:coursePackId/courses/:courseId/complete", async () => {
    const { id: coursePackId } = await insertCoursePack(db);

    const { id: courseId } = await insertCourse(db, coursePackId, {
      order: 1,
      title: "第一课",
    });
    const { id: courseIdNext } = await insertCourse(db, coursePackId, {
      order: 2,
      title: "第二课",
    });

    return request(app.getHttpServer())
      .post(`/course-pack/${coursePackId}/courses/${courseId}/complete`)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect(({ body }) => {
        expect(body.nextCourse.id).toBe(courseIdNext);
      });
  });
});
