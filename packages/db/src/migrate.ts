import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import * as mysql from "mysql2/promise";

async function main() {
  console.log("Running your migrations...");

  const connection = await mysql.createConnection({
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

  const db = drizzle(connection);

  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("Woohoo! Migrations completed!");
  return;
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    process.exit();
  });
