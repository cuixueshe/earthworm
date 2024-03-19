import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, "../../../apps/api/.env") });

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export const db = drizzle(connection);
