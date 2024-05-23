// 给定 course id
import { deleteStatements } from "../repositories/statement";

const courseId = "plisue0vqqyo4yafmmwv3e6a";

(async function () {
  await deleteStatements(courseId);
  console.log("删除完成");
  process.exit();
})();
