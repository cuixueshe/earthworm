import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

import { course, userProgress } from "@earthworm/schema";
import { createFirstCourse } from "../../../test/fixture/course";
import { getTokenOwner } from "../../../test/fixture/user";
import { cleanDB, signin } from "../../../test/helper/utils";
import { AppModule } from "../../app/app.module";
import { appGlobalMiddleware } from "../../app/useGlobal";
import { endDB } from "../../common/db";
import { DB, DbType } from "../../global/providers/db.provider";

const firstCourse = createFirstCourse();
describe("game e2e", () => {
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

  it("should start game", async () => {
    const token = await signin();

    await request(app.getHttpServer())
      .post("/game/start")
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect(({ body }) => {
        expect(body.cId).toBe(2);
      });
  });

  it("should not start game if not logged in", async () => {
    await request(app.getHttpServer()).post("/game/start").expect(401);
  });
});

async function setupDBData(db: DbType) {
  await db.insert(userProgress).values({
    courseId: 2,
    userId: getTokenOwner(),
  });

  await db.insert(course).values(firstCourse);
}
