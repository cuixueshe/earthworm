import { afterAll, beforeAll } from "vitest";

import { setupDB, teardownDb } from "./src/db";

beforeAll(async () => {
  // 创建连接数据库
  console.log(`setup db ${process.env.DATABASE_URL}`);
  await setupDB(process.env.DATABASE_URL || "");
});

afterAll(async () => {
  await teardownDb();
});
