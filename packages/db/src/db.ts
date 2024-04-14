import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import path from "node:path";

dotenv.config({ path: path.resolve(__dirname, "../../../apps/api/.env") });

console.log("connection string: ", process.env.DATABASE_URL);
const connection = postgres(process.env.DATABASE_URL ?? "");

export const db = drizzle(connection);
