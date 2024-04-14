import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../apps/api/.env.test") });

export default {
  schema: "../schema/src/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "",
  },
} satisfies Config;
