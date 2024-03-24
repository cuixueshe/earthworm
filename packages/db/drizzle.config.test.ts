import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../apps/api/.env") });

export default {
  schema: "../schema/src/schema/*",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.TEST_DATABASE_URL || "",
  },
} satisfies Config;
