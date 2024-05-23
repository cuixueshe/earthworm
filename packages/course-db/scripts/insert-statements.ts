// 插入 Statement
// 使用方式：
// 1. 给定 course id
// 2. 执行好 course title ， 会在 course-pack.json 中找到对应的 course title 拿到对应的数据添加
// 用户给 course 重新添加 statement 数据

import { createCoursePack } from "../course-pack";
import { readInputCoursePack } from "../input";
import * as coursePackRepository from "../repositories/course-pack";
import { deleteStatements } from "../repositories/statement";

const courseId = "";
const courseTitle = "Muddy Puddles";

(async function () {
  const course = findCourse(courseTitle);

  if (!course) {
    console.log(`找不到 course : ${courseTitle}`);
    return;
  }

  // 先清空之前的
  await deleteStatements(courseId);

  const createStatementTasks = course.statements.map(
    async ({ chinese, english, phonetic }, sIndex) => {
      return coursePackRepository.createStatement(courseId, sIndex + 1, chinese, english, phonetic);
    },
  );

  console.log("开始创建 statements");
  await Promise.all(createStatementTasks);
  console.log("创建 statements 完成");
  process.exit();
})();

function findCourse(courseTitle: string) {
  const coursePack = createCoursePack(readInputCoursePack());
  return coursePack.courses.find(({ title }) => {
    return title === courseTitle;
  });
}
