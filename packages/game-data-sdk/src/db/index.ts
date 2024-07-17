import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import type { SchemaType } from "@earthworm/schema";
import { schemas } from "@earthworm/schema";

export type DbType = PostgresJsDatabase<SchemaType>;

// eslint-disable-next-line import/no-mutable-exports
export let db: DbType;
let connection: postgres.Sql;

export const setupDB = async (databaseURL: string) => {
  connection = postgres(databaseURL || "");

  db = drizzle(connection, {
    schema: schemas,
  });

  return db;
};

export async function cleanDB(db: DbType) {
  await db.execute(
    sql`TRUNCATE TABLE courses, statements, "course_packs" , "user_course_progress", "course_history", "user_learn_record", "memberships" RESTART IDENTITY CASCADE;`,
  );
}

export async function teardownDb() {
  if (connection) {
    await connection.end();
  }
}
