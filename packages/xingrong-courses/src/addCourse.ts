import fs from "node:fs";
import path from "node:path";

import { db } from "@earthworm/db";
import { course as courseSchema, statement as statementSchema } from "@earthworm/schema";

type Statement = typeof statementSchema.$inferInsert;

(async function () {
  const coursePackId = "";
  const courseOrder = 53;
  const courseTitle = "";
  const courseFileName = "";
  const video = "";

  const [course] = await db
    .insert(courseSchema)
    .values({
      coursePackId,
      order: courseOrder,
      title: courseTitle,
      video,
    })
    .returning({ id: courseSchema.id, order: courseSchema.order, title: courseSchema.title });

  console.log(`创建: id-${course.id} order-${course.order} title-${course.title}`);

  const courseDataJsonText = fs.readFileSync(
    path.resolve(__dirname, `../data/courses/${courseFileName}`),
    "utf-8",
  );

  const statementList = JSON.parse(courseDataJsonText) as Statement[];

  let order = 1;
  const statementInsertTask = statementList.map(async (statement) => {
    return await db.insert(statementSchema).values({
      ...statement,
      order: order++,
      courseId: course.id,
    });
  });

  await Promise.all(statementInsertTask);

  console.log("全部创建完成");
  process.exit(0);
})();
