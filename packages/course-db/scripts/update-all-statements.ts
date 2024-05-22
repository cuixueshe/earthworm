// 用于批量更新 course 的 statements
// 给定 course id  然后基于 order 来更新 statement 的 chinese & english & soundmark
// 使用方式：
// 1. 把需要更新的数据放到 ./data/course-pack.json 内
// 2. 把需要更新的 course id 放到  courses 数组中 (程序会按照顺序来进行更新)

import { createCoursePack } from "../course-pack";
import { readInputCoursePack } from "../input";
import * as coursePackRepository from "../repositories/course-pack";

// 需要填写的参数
const courses: string[] = [];

const coursePack = createCoursePack(readInputCoursePack());

coursePack.courses.forEach(async (course, cOrder) => {
  console.log(`course: ${courses[cOrder]}`);
  const courseId = courses[cOrder];
  const task = course.statements.map((statement, index) => {
    const order = index + 1;
    return coursePackRepository.updateStatement(
      courseId,
      statement.chinese,
      statement.english,
      order,
    );
  });

  await Promise.all(task);
  console.log("更新完成");
});
