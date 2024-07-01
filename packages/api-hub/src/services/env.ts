import { join } from "path";

import dotenv from "dotenv";

const envName =
  process.env.NODE_ENV === "prod"
    ? ".env.prod"
    : process.env.NODE_ENV === "test"
      ? ".env.test"
      : ".env";

console.log(envName);
dotenv.config({
  path: join(__dirname, `../../${envName}`),
});
