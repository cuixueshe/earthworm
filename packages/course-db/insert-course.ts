// 用于创建新的 course
// 使用方式:
// 1. 把需要更新的数据放到 ./data/course-pack.json 内
// 2. 给定 coursePackId
// 3. 给定要添加的 order
//    比如之前已经有 20 课了， 现在我要在创建 20 课，那么 order 就需要设置成 21
import { db } from "@earthworm/db";
import { course as courseSchema, statement as statementSchema } from "@earthworm/schema";
import { createCoursePack, Statement } from "./coursePack";
import { readInputCoursePack } from "./input";

const coursePack = createCoursePack(readInputCoursePack());
const coursePackId = "";
const order = 1;

(async function () {
  for (const [cIndex, course] of coursePack.courses.entries()) {
    const [courseEntity] = await db
      .insert(courseSchema)
      .values({
        coursePackId,
        order: order + cIndex,
        title: course.title,
        description: course.description,
      })
      .returning({ id: courseSchema.id, order: courseSchema.order, title: courseSchema.title });

    console.log(
      `创建: id-${courseEntity.id} order-${courseEntity.order} title-${courseEntity.title}`,
    );

    const createStatementTasks = course.statements.map(async (statement, sIndex) => {
      return createStatement(statement, sIndex + 1, courseEntity.id);
    });

    console.log("开始创建 statements");
    await Promise.all(createStatementTasks);
    console.log("创建 statements 完成");
  }
})();

async function createStatement(statement: Statement, order: number, courseId: string) {
  return await db.insert(statementSchema).values({
    chinese: statement.chinese,
    english: statement.english,
    soundmark: statement.phonetic,
    order,
    courseId,
  });
}
