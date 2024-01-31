import fs from "node:fs";
import { eq } from "drizzle-orm";
import path from "node:path";
import { course as courseSchema } from "@shared/schema";
import { db } from "./db";

const loadCourses = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./loadCourses.json"), "utf-8")
);

(async function () {
  const result = [];

  for (const course of loadCourses) {
    const existingCourses = await db
      .select()
      .from(courseSchema)
      .where(eq(courseSchema.title, course.title));

    const existingCourse = existingCourses?.[0];

    if (existingCourse) {
      result.push({
        title: existingCourse.title,
        fileName: course.fileName,
        cId: existingCourse.id,
      });
    } else {
      const [response] = await db.insert(courseSchema).values({
        title: course.title,
      });
      console.log("新创建:", course.title)
      result.push({
        title: course.title,
        fileName: course.fileName,
        cId: response.insertId,
      });
    }
  }

  fs.writeFileSync(
    path.resolve(__dirname, "./courses.json"),
    JSON.stringify(result)
  );
  console.log("生成 courses.json 成功");
  process.exit(0);
})();
