import { MySqlTableWithColumns } from 'drizzle-orm/mysql-core';
import { testDb } from './test-db';
import { user, userProgress } from '@earthworm/shared';

const resetDb = async (...tables: MySqlTableWithColumns<any>[]) => {
  await Promise.all(tables.map((table) => testDb.delete(table)));
};

export const resetDbHelper = () => resetDb(user, userProgress);
