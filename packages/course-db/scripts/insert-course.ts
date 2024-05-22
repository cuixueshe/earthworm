// 用于创建新的 course
// 使用方式:
// 1. 把需要更新的数据放到 ./data/course-pack.json 内
// 2. 给定 coursePackId
// 3. 给定要添加的 order
//    比如之前已经有 20 课了， 现在我要在创建 20 课，那么 order 就需要设置成 21
import { createCoursePack } from "../course-pack";
import { readInputCoursePack } from "../input";
import * as coursePackRepository from "../repositories/course-pack";

// 需要填写的参数
const coursePackId = "";
const order = 1;

const coursePack = createCoursePack(readInputCoursePack());

for (const [cIndex, course] of coursePack.courses.entries()) {
  const courseEntity = await coursePackRepository.createCourses(
    coursePackId,
    order + cIndex,
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
