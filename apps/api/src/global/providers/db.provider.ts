import { FactoryProvider, Logger } from '@nestjs/common';
import { type MySql2Database } from 'drizzle-orm/mysql2';
import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import { DefaultLogger, LogWriter } from 'drizzle-orm';
import { schemas } from '@earthworm/shared';

export const DB = 'DB_SERVICE';
export type DbType = MySql2Database<typeof schemas>;

const env = process.env;

export const DbProvider: FactoryProvider<DbType> = {
  provide: DB,
  useFactory: async () => {
    const logger = new Logger('DB');

    logger.debug(`Connecting to ${env.DATABASE_URL}`);
    logger.debug(`SECRET: ${env.SECRET}`);

    const connection = await mysql.createConnection({
      uri: env.DATABASE_URL,
      multipleStatements: true,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });

    logger.debug(`Connected success`);

    class CustomDbLogWriter implements LogWriter {
      write(message: string) {
        logger.verbose(message);
      }
    }

    const db = drizzle(connection, {
      schema: schemas,
      logger: new DefaultLogger({ writer: new CustomDbLogWriter() }),
      mode: 'planetscale',
    });
    return db;
  },
};
