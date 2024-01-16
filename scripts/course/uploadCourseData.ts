// 该文件的逻辑都是临时的
// 后续会基于后台管理页面来上传数据
// 所以这个脚本的逻辑都无需修改
// 平时的开发也无需执行该脚本 数据已经全部推上去了
import fs from 'node:fs'
import { db } from './db';
import { statement } from '@shared/schema';
import path from 'node:path'


(async function () {
  const courses = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./courses.json"), {encoding: 'utf-8'})
  );
  await db.delete(statement);

  function createStatement(order: number, chinese: string, english: string, soundmark: string, courseId: number) {
    return db.insert(statement).values({
      order,
      chinese,
      english,
      soundmark,
      courseId
    })
  }

  let orderIndex = 1;
  for (let i = 0; i < courses.length; i++) {
    const {cId, fileName} = courses[i];
    const courseDataText = fs.readFileSync(
      path.resolve(__dirname, `./courses/${fileName}.json`),
      "utf-8"
    );
    const courseData = JSON.parse(courseDataText);

    const promiseAll = courseData.map((statement: any, index: number) => {
      const { chinese, english, soundmark } = statement;

      const result = createStatement(
        orderIndex,
        chinese,
        english,
        soundmark,
        cId
      );
      orderIndex++;
      return result;
    });

    console.log(`开始上传： courseName:${fileName}`);
    await Promise.all(promiseAll);
    console.log(`courseName: ${fileName} 全部上传成功`);
  }
  process.exit(0);

})();
