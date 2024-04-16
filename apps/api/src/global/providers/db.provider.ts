import { FactoryProvider } from "@nestjs/common";
import { type PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { schemas } from "@earthworm/schema";
import { setupDB } from "../../common/db";

export const DB = Symbol("DB_SERVICE");
export type DbType = PostgresJsDatabase<typeof schemas>;

export const DbProvider: FactoryProvider<DbType> = {
  provide: DB,
  useFactory: async () => {
    return await setupDB();
  },
};
