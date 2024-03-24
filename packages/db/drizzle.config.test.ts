import type { Config } from "drizzle-kit";

export default {
  schema: "../../libs/shared/src/schema/*",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    uri: "mysql://root:password@localhost:3307/earthworm_test",
  },
  strict: true,
} satisfies Config;
