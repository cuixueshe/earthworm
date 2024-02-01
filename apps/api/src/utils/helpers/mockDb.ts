import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import { env } from 'process';
import { schemas } from '@earthworm/shared';
import { FactoryProvider, Module } from '@nestjs/common';
import { DB, DbType } from '../../global/providers/db.provider';

const connection = mysql.createPool({
  uri: env.TEST_DATABASE_URL,
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export const mockDb = drizzle(connection, {
  schema: schemas,
  mode: 'planetscale',
});

const MockDBProvider: FactoryProvider<DbType> = {
  provide: DB,
  useFactory: async () => {
    return mockDb;
  },
};

@Module({
  providers: [MockDBProvider],
  exports: [DB],
})
export class MockDBModule {}
