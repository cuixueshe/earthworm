import fs from 'node:fs'
import path from 'node:path'
import {course as courseSchema, statement} from '@shared/schema'
import { db } from './db';


const loadCourses = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./loadCourses.json"), "utf-8")
);

(async function () {

  // 先删除所有的 courses
  await db.delete(statement)
  await db.delete(courseSchema)


  const result = [];

  for (const course of loadCourses) {
    const [response] = await db.insert(courseSchema).values({
      title: course.title,
    })


    result.push({
      title: course.title,
      fileName: course.fileName,
      cId: response.insertId,
    });
  }

  fs.writeFileSync(
    path.resolve(__dirname, "./courses.json"),
    JSON.stringify(result)
  );
  console.log("生成 courses.json 成功");
  process.exit(0);
})();
