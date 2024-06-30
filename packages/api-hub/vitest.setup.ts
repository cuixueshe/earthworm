import "./src/utils/env";

import { afterAll, beforeAll } from "vitest";

import { setupDb, teardownDb } from "./src/db";

beforeAll(async () => {
  // 创建连接数据库
  await setupDb();
});

afterAll(async () => {
  await teardownDb();
});
