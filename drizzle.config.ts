import type { Config } from "drizzle-kit";

export default {
  schema: "libs/shared/src/schema/*",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URL || "",
  },
} satisfies Config;
