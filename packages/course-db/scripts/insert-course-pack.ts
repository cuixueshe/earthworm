/**
 * 创建课程包
 * 使用方式：
 * 1. 修改 order
 * 2. 提供 cover
 */
import { createCoursePack } from "../course-pack";
import { readInputCoursePack } from "../input";
import * as coursePackRepository from "../repositories/course-pack";

// 需要填写的参数
const coursePackOrder = 3;
const courseCover = "";

(async function () {
  const coursePack = createCoursePack(readInputCoursePack());
  const coursePackEntity = await coursePackRepository.createCoursePack(
    coursePackOrder,
    coursePack.title,
    coursePack.description,
    courseCover,
  );

  for (const [cIndex, course] of coursePack.courses.entries()) {
    const courseEntity = await coursePackRepository.createCourses(
      coursePackEntity.id,
      cIndex + 1,
      course.title,
      course.description,
    );

    console.log(
      `创建: id-${courseEntity.id} order-${courseEntity.order} title-${courseEntity.title}`,
    );

    const createStatementTasks = course.statements.map(
      async ({ chinese, english, phonetic }, sIndex) => {
        return coursePackRepository.createStatement(
          courseEntity.id,
          sIndex + 1,
          chinese,
          english,
          phonetic,
        );
      },
    );

    console.log("开始创建 statements");
    await Promise.all(createStatementTasks);
    console.log("创建 statements 完成");
  }
})();
