import { getRedisConnectionToken } from "@nestjs-modules/ioredis";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Redis } from "ioredis";
import * as request from "supertest";

import { createLogtoUser } from "../../../test/fixture/user";
import { cleanDB, signin } from "../../../test/helper/utils";
import { AppModule } from "../../app/app.module";
import { appGlobalMiddleware } from "../../app/useGlobal";
import { endDB } from "../../common/db";
import { DB, DbType } from "../../global/providers/db.provider";

describe("rank e2e", () => {
  let app: INestApplication;
  let db: DbType;
  let redis: Redis;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appGlobalMiddleware(app);
    db = moduleFixture.get<DbType>(DB);
    redis = moduleFixture.get<Redis>(getRedisConnectionToken());

    await app.init();
    await cleanDB(db);
    await setupDBData(moduleFixture, redis);
    token = await signin(moduleFixture);
  });

  afterEach(async () => {
    await redis.flushdb();
    await cleanDB(db);
    await endDB();
    await app.close();
  });

  it("get: /rank/progress/weekly", async () => {
    await request(app.getHttpServer())
      .get("/rank/progress/weekly")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            list: expect.arrayContaining([
              expect.objectContaining({
                username: expect.anything(),
                count: 1,
              }),
            ]),
          }),
        );
      });
  });

  it("get: /rank/progress/weekly", async () => {
    await request(app.getHttpServer())
      .get("/rank/progress/weekly")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.self).toHaveProperty("userId");
        expect(body.self).toHaveProperty("rank");
        expect(body.self).toHaveProperty("count");
        expect(body.self).toHaveProperty("username");
      });
  });
});

async function setupDBData(builder: TestingModule, redis: Redis) {
  const { userId } = await createLogtoUser(builder, "xiaoming");
  const FINISH_COUNT_KEY = `user:finishCount`;
  await redis.zadd(FINISH_COUNT_KEY, 1, userId);
}
