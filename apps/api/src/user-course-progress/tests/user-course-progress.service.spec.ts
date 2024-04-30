import { Test } from "@nestjs/testing";
import { createId } from "@paralleldrive/cuid2";

import { insertCoursePack } from "../../../test/fixture/db";
import { cleanDB, testImportModules } from "../../../test/helper/utils";
import { endDB } from "../../common/db";
import { DB, DbType } from "../../global/providers/db.provider";
import { UserCourseProgressService } from "../user-course-progress.service";

describe("user-progress service", () => {
  let userCourseProgressService: UserCourseProgressService;
  let db: DbType;

  beforeAll(async () => {
    const testHelper = await setupTesting();
    await setupDatabaseData(testHelper.db);

    db = testHelper.db;
    userCourseProgressService = testHelper.userCourseProgressService;
  });

  afterAll(async () => {
    await cleanDB(db);
    await endDB();
  });

  beforeEach(async () => {
    await cleanDB(db);
  });

  it("should update an existing progress entry", async () => {
    const userId = "cxr";
    const coursePackId = createId();
    const courseId = createId();
    const statementIndex = 1;
    const newStatementIndex = 2;
    await userCourseProgressService.upsert(userId, coursePackId, courseId, statementIndex);

    await userCourseProgressService.upsert(userId, coursePackId, courseId, newStatementIndex);

    const result = await userCourseProgressService.findStatement(userId, coursePackId, courseId);

    expect(result).toBe(newStatementIndex);
  });

  it("should return the statementIndex when there is progress for the specific course pack and course", async () => {
    const userId = "cxr";
    const coursePackId = createId();
    const courseId = createId();
    const statementIndex = 1;
    await userCourseProgressService.upsert(userId, coursePackId, courseId, statementIndex);

    const result = await userCourseProgressService.findStatement(userId, coursePackId, courseId);

    expect(result).toBe(statementIndex);
  });

  it("should return 0 when there is no progress for the specific course pack and course", async () => {
    // not add any user course progress
    const statementIndex = await userCourseProgressService.findStatement(
      "cxr",
      createId(),
      createId(),
    );

    expect(statementIndex).toBe(0);
  });

  describe("getUserRecentCoursePacks", () => {
    const userId = "cxr";
    let coursePackEntityFirst;
    let coursePackEntitySecond;

    beforeEach(async () => {
      coursePackEntityFirst = await insertCoursePack(db, {
        order: 1,
        title: "零基础",
        description: "这是零基础学英语",
        isFree: true,
        cover: "",
      });

      coursePackEntitySecond = await insertCoursePack(db, {
        order: 2,
        title: "300个基础句子",
        description: "快乐学英语",
        isFree: true,
        cover: "",
      });
    });

    it("should return the actual number of course packs when there are not enough course packs", async () => {
      const limit = 5;

      const courseId1 = createId();
      const courseId2 = createId();
      await userCourseProgressService.upsert(userId, coursePackEntityFirst.id, courseId1, 1);
      await userCourseProgressService.upsert(userId, coursePackEntityFirst.id, courseId2, 1);

      const recentCoursePacks = await userCourseProgressService.getUserRecentCoursePacks(
        userId,
        limit,
      );

      expect(recentCoursePacks.length).toBe(1);

      expect(recentCoursePacks[0]).toEqual(
        expect.objectContaining({
          coursePackId: coursePackEntityFirst.id,
          courseId: courseId2,
          title: coursePackEntityFirst.title,
          description: coursePackEntityFirst.description,
          cover: expect.anything(),
        }),
      );
    });

    it("should return the recent course packs for a given user up to the specified limit", async () => {
      const limit = 1;

      await userCourseProgressService.upsert(userId, coursePackEntityFirst.id, createId(), 1);
      await userCourseProgressService.upsert(userId, coursePackEntitySecond.id, createId(), 1);

      const recentCoursePacks = await userCourseProgressService.getUserRecentCoursePacks(
        userId,
        limit,
      );

      expect(recentCoursePacks.length).toBe(1);
    });
  });
});

async function setupDatabaseData(db: DbType) {
  await cleanDB(db);
}
async function setupTesting() {
  const moduleRef = await Test.createTestingModule({
    imports: testImportModules,
    providers: [UserCourseProgressService],
  }).compile();

  return {
    db: moduleRef.get<DbType>(DB),
    userCourseProgressService: moduleRef.get<UserCourseProgressService>(UserCourseProgressService),
  };
}
