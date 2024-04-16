import { JwtModule } from "@nestjs/jwt";
import { sql } from "drizzle-orm";
import { DbType } from "src/global/providers/db.provider";

import { GlobalModule } from "../../src/global/global.module";
import { fetchToken } from "../../src/services/logtoService";
import { MockRedisModule } from "./mockRedis";

export async function cleanDB(db: DbType) {
  await db.execute(
    sql`TRUNCATE TABLE courses, statements, "user-progress", "course-history", "user-learn-record" RESTART IDENTITY CASCADE;`,
  );
}

export async function signin() {
  const token = await fetchToken();
  return token;
}

export const testImportModules = [
  MockRedisModule,
  GlobalModule,
  JwtModule.register({
    secret: process.env.SECRET,
    signOptions: { expiresIn: "7d" },
  }),
];
