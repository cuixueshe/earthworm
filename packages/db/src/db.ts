import path from "node:path";

import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { schemas } from "@earthworm/schema";

const envName = process.env.NODE_ENV === "prod" ? ".env.prod" : ".env";
dotenv.config({ path: path.resolve(__dirname, `../../../apps/api/${envName}`) });

console.log("connection string: ", process.env.DATABASE_URL);
const connection = postgres(process.env.DATABASE_URL ?? "");

export const db = drizzle(connection, {
  schema: schemas,
});
