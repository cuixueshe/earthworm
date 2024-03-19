import * as dotenv from 'dotenv';
import type { Config } from "drizzle-kit";
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, "../../apps/api/.env") });

console.log("process.env.DATABASE_URL: ", process.env.DATABASE_URL);

export default {
  schema: "../../libs/shared/src/schema/*",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URL || "",
  },
} satisfies Config;
