import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { DefaultLogger, LogWriter } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { schemas, SchemaType } from "@earthworm/schema";
import { logger } from "~/utils/logger";

export type DbType = PostgresJsDatabase<SchemaType>;

export let db: DbType;

export const initDb = async () => {
  const connection = postgres(process.env.DATABASE_URL || "");
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
