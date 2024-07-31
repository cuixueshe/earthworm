import { JwtModule } from "@nestjs/jwt";
import { TestingModule } from "@nestjs/testing";
import { sql } from "drizzle-orm";
import { DbType } from "src/global/providers/db.provider";

import { GlobalModule } from "../../src/global/global.module";
import { LogtoService } from "../../src/logto/logto.service";
import { MockRedisModule } from "./mockRedis";

export async function cleanDB(db: DbType) {
  await db.execute(
    sql`TRUNCATE TABLE courses, statements, "course_packs" , "user_course_progress", "course_history", "user_learning_activities", "mastered_elements", "memberships" RESTART IDENTITY CASCADE;`,
  );
}

export async function signin(builder: TestingModule) {
  const logto = builder.get(LogtoService);
  return await logto.fetchToken();
}

export const testImportModules = [
  MockRedisModule,
  GlobalModule,
  JwtModule.register({
    secret: process.env.SECRET,
    signOptions: { expiresIn: "7d" },
  }),
];
