import { FactoryProvider, Logger } from '@nestjs/common';
import { type MySql2Database } from 'drizzle-orm/mysql2';
import { env } from '@earthwrom/shared';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { DefaultLogger, LogWriter } from 'drizzle-orm';

export const DB = Symbol('DB_SERVICE');
export type DbType = MySql2Database;

export const DbProvider: FactoryProvider<DbType> = {
  provide: DB,
  useFactory: () => {
    const logger = new Logger('DB');

    logger.debug(`Connecting to ${env.DATABASE_URL}`);

    const connection = mysql.createPool({
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

    return drizzle(connection, {
      logger: new DefaultLogger({ writer: new CustomDbLogWriter() }),
    });
  },
};
