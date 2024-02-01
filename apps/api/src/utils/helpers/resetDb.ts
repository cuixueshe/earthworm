import { MySqlTableWithColumns } from 'drizzle-orm/mysql-core';
import { testDb } from './test-db';

export const resetDb = async (...tables: MySqlTableWithColumns<any>[]) => {
  await Promise.all(tables.map((table) => testDb.delete(table)));
};
