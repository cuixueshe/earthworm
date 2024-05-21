import { eq } from "drizzle-orm";

import { db } from "@earthworm/db";
import { course as courseSchema } from "@earthworm/schema";

export async function updateCourseDescription(courseId: string, description: string) {
  return db
    .update(courseSchema)
    .set({
      description,
    })
    .where(eq(courseSchema.id, courseId));
}
