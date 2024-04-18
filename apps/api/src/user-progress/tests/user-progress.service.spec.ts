import { Test } from "@nestjs/testing";

import { createFirstCourse } from "../../../test/fixture/course";
import { createUser } from "../../../test/fixture/user";
import { cleanDB, testImportModules } from "../../../test/helper/utils";
import { endDB } from "../../common/db";
import { DB, DbType } from "../../global/providers/db.provider";
import { UserProgressService } from "../user-progress.service";

const userData = createUser();
const course = createFirstCourse();

describe("user-progress service", () => {
  let userProgressService: UserProgressService;
  let db: DbType;

  beforeAll(async () => {
    const testHelper = await setupTesting();
    await setupDatabaseData(testHelper.db);

    db = testHelper.db;
    userProgressService = testHelper.userProgressService;
  });

  afterAll(async () => {
    await cleanDB(db);
    await endDB();
  });

  it("should update user progress", async () => {
    await userProgressService.update(userData.userId, course.id);

    const data = await userProgressService.findOne(userData.userId);

    expect(data.courseId).toBe(course.id);
  });
});

async function setupDatabaseData(db: DbType) {
  await cleanDB(db);
}
async function setupTesting() {
  const moduleRef = await Test.createTestingModule({
    imports: testImportModules,
    providers: [UserProgressService],
  }).compile();

  return {
    db: moduleRef.get<DbType>(DB),
    userProgressService: moduleRef.get<UserProgressService>(UserProgressService),
  };
}
