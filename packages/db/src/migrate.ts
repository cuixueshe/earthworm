import { sql } from "drizzle-orm";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import { db } from "./db";

async function main() {
  console.log("Running your migrations...");
  // 创建一个枚举类型
  await db.execute(sql`CREATE TYPE membership_type AS ENUM ('regular', 'premium');`);
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
