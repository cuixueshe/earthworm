import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { DefaultLogger, LogWriter, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { schemas, SchemaType } from "@earthworm/schema";
import { logger } from "~/utils/logger";

export type DbType = PostgresJsDatabase<SchemaType>;

export let db: DbType;
let connection: postgres.Sql;

export const setupDb = async (databaseUrl?: string) => {
  const dbUrl = databaseUrl || process.env.DATABASE_URL || "";
  connection = postgres(dbUrl);
  logger.info(`DB_URL: ${process.env.DATABASE_URL}`);

  class CustomDbLogWriter implements LogWriter {
    write(message: string) {
      logger.debug(message);
    }
  }

  db = drizzle(connection, {
    schema: schemas,
    logger: new DefaultLogger({ writer: new CustomDbLogWriter() }),
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
    logger.info("Database connection closed.");
  }
}
