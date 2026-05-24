import fs from "node:fs";
import path from "node:path";

import { db } from "@earthworm/db";
import {
  coursePack,
  course as courseSchema,
  statement as statementSchema,
} from "@earthworm/schema";

type Statement = typeof statementSchema.$inferInsert;

const courses = fs.readdirSync(path.resolve(__dirname, "../data/courses"));

(async function () {
  await db.delete(coursePack);
  await db.delete(statementSchema);
  await db.delete(courseSchema);

  const [coursePackEntity] = await db
    .insert(coursePack)
    .values({
      order: 1,
      title: "Earthworm - Học tiếng Anh từ cơ bản",
      description: "Khóa học phù hợp nhất cho người mới bắt đầu",
      creatorId: "1",
      shareLevel: "public",
      isFree: true,
      cover:
        "https://earthworm-prod-1312884695.cos.ap-beijing.myqcloud.com/course-packs/xingrong.jpg",
    })
    .returning();

  const courseList = await Promise.all(
    courses.map(async (courseFileName, index) => {
      const courseName = path.parse(courseFileName).name;
      const [course] = await db
        .insert(courseSchema)
        .values({
          coursePackId: coursePackEntity.id,
          // Index starts from 0
          order: index + 1,
          title: convertToVietnameseTitle(courseName),
        })
        .returning({ id: courseSchema.id, order: courseSchema.order, title: courseSchema.title });

      console.log(`Created: id-${course.id} order-${course.order} title-${course.title}`);

      return {
        ...course,
        meta: {
          courseFileName,
          courseName,
        },
      };
    }),
  );

  await Promise.all(
    courseList.map(async (course) => {
      const { id: courseId, meta } = course;

      const courseDataJsonText = fs.readFileSync(
        path.resolve(__dirname, `../data/courses/${meta.courseFileName}`),
        "utf-8",
      );

      const statementList = JSON.parse(courseDataJsonText) as Statement[];

      let order = 1;
      const statementInsertTask = statementList.map(async (statement) => {
        return await db.insert(statementSchema).values({
          ...statement,
          order: order++,
          courseId,
        });
      });

      console.log(`courseName: ${meta.courseFileName} uploading started`);
      await Promise.all(statementInsertTask);
      console.log(`courseName: ${meta.courseFileName} upload complete`);
    }),
  );

  console.log("All courses created successfully");
  process.exit(0);
})();

function convertToVietnameseTitle(numStr: string): string {
  return `Bài ${numStr}`;
}
