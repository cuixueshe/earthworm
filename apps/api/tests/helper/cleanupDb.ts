import { MySqlTableWithColumns } from 'drizzle-orm/mysql-core';
import { mockDb } from './mockDb';
import { user, userProgress } from '@earthworm/shared';

const resetDb = async (...tables: MySqlTableWithColumns<any>[]) => {
  await Promise.all(tables.map((table) => mockDb.delete(table)));
};

export const cleanupMockDb = () => resetDb(user, userProgress);
