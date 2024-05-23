import { eq } from "drizzle-orm";

import { db } from "@earthworm/db";
import { statement as statementSchema } from "@earthworm/schema";

export async function deleteStatements(courseId: string) {
  await db.delete(statementSchema).where(eq(statementSchema.courseId, courseId));
}
