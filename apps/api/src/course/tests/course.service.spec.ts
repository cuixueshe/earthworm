import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { createId } from "@paralleldrive/cuid2";

import type { DbType } from "../../global/providers/db.provider";
import { insertCourse, insertCoursePack, insertStatement } from "../../../test/fixture/db";
import { cleanDB, testImportModules } from "../../../test/helper/utils";
import { endDB } from "../../common/db";
import { CourseHistoryService } from "../../course-history/course-history.service";
import { DB } from "../../global/providers/db.provider";
import { RankService } from "../../rank/rank.service";
import { UserCourseProgressService } from "../../user-course-progress/user-course-progress.service";
import { CourseService } from "../course.service";

describe("course service", () => {
  let db: DbType;
  let courseService: CourseService;
  let rankService: RankService;
  let courseHistoryService: CourseHistoryService;
  let userCourseProgressService: UserCourseProgressService;

  beforeAll(async () => {
    const testHelper = await setupTesting();
    await setupDatabaseData(testHelper.db);

    db = testHelper.db;
    courseService = testHelper.courseService;
    rankService = testHelper.rankService;
    courseHistoryService = testHelper.courseHistoryService;
    userCourseProgressService = testHelper.UserCourseProgressService;
  });
  beforeEach(async () => {
    await cleanDB(db);
  });

  afterAll(async () => {
    await cleanDB(db);
    await endDB();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe("find", () => {
    it("should return a course with the given coursePackId and courseId", async () => {
      const { coursePackId, courseEntityFirst } = await setupDBData(db);

      const result = await courseService.find(coursePackId, courseEntityFirst.id);

      expect(result).toHaveProperty("coursePackId");
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("order");
      expect(result).toHaveProperty("title");
      expect(result).toHaveProperty("statements");
    });

    it("should throw NotFoundException if the course does not exist", async () => {
      await expect(courseService.find(createId(), createId())).rejects.toThrow(NotFoundException);
    });
  });

  describe("findWithUserProgress", () => {
    it("should return a course with user progress information", async () => {
      const { coursePackId, courseEntityFirst, userId } = await setupDBData(db);

      const result = await courseService.findWithUserProgress(
        coursePackId,
        courseEntityFirst.id,
        userId,
      );

      expect(result).toHaveProperty("statementIndex");
    });
  });

  describe("findNext", () => {
    it("should return the next course", async () => {
      const { coursePackId, courseEntityFirst, courseEntitySecond } = await setupDBData(db);

      const result = await courseService.findNext(coursePackId, courseEntityFirst.id);

      expect(result).toEqual(courseEntitySecond);
    });

    it("should throw NotFoundException if there is no next course", async () => {
      const { coursePackId, courseEntitySecond } = await setupDBData(db);

      await expect(courseService.findNext(coursePackId, courseEntitySecond.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("completeCourse", () => {
    it("should perform actions to complete a course for a user with userId and return the next course", async () => {
      const { userId, courseEntityFirst, coursePackId } = await setupDBData(db);

      const result = await courseService.completeCourse(userId, coursePackId, courseEntityFirst.id);

      expect(result).toHaveProperty("nextCourse");
      expect(rankService.userFinishCourse).toHaveBeenCalled();
      expect(courseHistoryService.upsert).toHaveBeenCalled();
      expect(userCourseProgressService.upsert).toHaveBeenCalled();
    });

    it("should perform actions to complete a course and return the next course when have not userId", async () => {
      const { courseEntityFirst, coursePackId } = await setupDBData(db);

      const result = await courseService.completeCourse("", coursePackId, courseEntityFirst.id);

      expect(result).toHaveProperty("nextCourse");
      expect(rankService.userFinishCourse).not.toHaveBeenCalled();
      expect(courseHistoryService.upsert).not.toHaveBeenCalled();
      expect(userCourseProgressService.upsert).not.toHaveBeenCalled();
    });

    it("should not have nextCourse when not exist next course", async () => {
      const { courseEntitySecond, coursePackId } = await setupDBData(db);

      const result = await courseService.completeCourse("", coursePackId, courseEntitySecond.id);

      expect(result.nextCourse).toBeUndefined();
    });
  });
});

async function setupDatabaseData(db: DbType) {
  await cleanDB(db);
}

async function setupTesting() {
  const mockRankService = {
    userFinishCourse: jest.fn(),
  };
  const mockCourseHistoryService = {
    upsert: jest.fn(),
  };
  const mockUserLearnRecordService = {
    upsert: jest.fn(),
  };

  const mockUserCourseProgressService = {
    upsert: jest.fn(),
    findStatement: () => 1,
  };

  const moduleRef = await Test.createTestingModule({
    imports: testImportModules,
    providers: [
      CourseService,
      { provide: RankService, useValue: mockRankService },
      { provide: CourseHistoryService, useValue: mockCourseHistoryService },
      { provide: UserCourseProgressService, useValue: mockUserCourseProgressService },
    ],
  }).compile();

  return {
    courseService: moduleRef.get<CourseService>(CourseService),
    UserCourseProgressService: moduleRef.get<UserCourseProgressService>(UserCourseProgressService),
    rankService: moduleRef.get<RankService>(RankService),
    courseHistoryService: moduleRef.get<CourseHistoryService>(CourseHistoryService),
    db: moduleRef.get<DbType>(DB),
    moduleRef,
  };
}

async function setupDBData(db: DbType) {
  const userId = "cxr";
  const coursePackEntity = await insertCoursePack(db);
  const courseEntityFirst = await insertCourse(db, coursePackEntity.id, {
    title: "第一课",
    order: 1,
  });
  const courseEntitySecond = await insertCourse(db, coursePackEntity.id, {
    title: "第二课",
    order: 2,
  });
  const statementEntityFirst = await insertStatement(db, courseEntityFirst.id, 1);
  const statementEntitySecond = await insertStatement(db, courseEntityFirst.id, 2);

  return {
    userId,
    coursePackId: coursePackEntity.id,
    courseEntityFirst,
    courseEntitySecond,
    statementEntityFirst,
    statementEntitySecond,
  };
}
