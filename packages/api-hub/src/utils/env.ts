import { join } from "path";

import dotenv from "dotenv";

const envName =
  process.env.NODE_ENV === "prop"
    ? ".env.prod"
    : process.env.NODE_ENV === "test"
      ? ".env.test"
      : ".env";

dotenv.config({
  path: join(__dirname, `../../${envName}`),
});
