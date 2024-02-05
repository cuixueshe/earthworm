import type { Config } from "drizzle-kit";

export default {
  schema: "libs/shared/src/schema/*",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.TEST_DATABASE_URL || "",
  },
  strict: true,
} satisfies Config;
