import { pgGenerate } from "drizzle-dbml-generator";

import { schemas } from "./index";

const out = "./schema.dbml";
const relational = true;

pgGenerate({ schema: schemas, out, relational });
