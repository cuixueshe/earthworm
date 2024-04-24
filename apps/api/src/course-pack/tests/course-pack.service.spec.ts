import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import type { DbType } from "../../global/providers/db.provider";
import { insertCourse, insertCoursePack } from "../../../test/fixture/db";
import { cleanDB, testImportModules } from "../../../test/helper/utils";
import { endDB } from "../../common/db";
import { CourseHistoryService } from "../../course-history/course-history.service";
import { CourseService } from "../../course/course.service";
import { DB } from "../../global/providers/db.provider";
import { CoursePackService } from "../course-pack.service";

describe("CoursePackService", () => {
  let db: DbType;
  let coursePackService: CoursePackService;
  let courseService: CourseService;

  beforeAll(async () => {
    const testHelper = await setupTesting();
    db = testHelper.db;
    coursePackService = testHelper.coursePackService;
    courseService = testHelper.courseService;
  });

  beforeEach(async () => {
    await cleanDB(db);
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await cleanDB(db);
    await endDB();
  });

  describe("findAll", () => {
    it("should return an array of course packs", async () => {
      await insertCoursePack(db);
      await insertCoursePack(db);

      const result = await coursePackService.findAll();

      expect(result.length).toBe(2);
    });
  });

  describe("findOne", () => {
    it("should return a course pack for a valid ID", async () => {
      const coursePackEntity = await insertCoursePack(db);

      const result = await coursePackService.findOne(1);

      expect(result).toEqual(coursePackEntity);
    });

    it("should throw NotFoundException for an invalid ID", async () => {
      await expect(coursePackService.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe("findOneWithCourses", () => {
    it("should return a course pack with courses and completion counts when userId is provided", async () => {
      const userId = "cxr";
      const coursePackEntity = await insertCoursePack(db);
      await insertCourse(db, coursePackEntity.id);

      const result = await coursePackService.findOneWithCourses(userId, coursePackEntity.id);

      expect(result.courses.length).toBe(1);
      expect(result.courses[0]).toHaveProperty("completionCount");
    });

    it("should return a course pack with courses without completion counts when userId is not provided", async () => {
      const notUserId = "";
      const coursePackEntity = await insertCoursePack(db);
      await insertCourse(db, coursePackEntity.id);

      const result = await coursePackService.findOneWithCourses(notUserId, 1);

      expect(result.courses.length).toBe(1);
      expect(result.courses[0]).not.toHaveProperty("completionCount");
    });
  });

  describe("findCourse", () => {
    it("should call courseService.findWithUserProgress when userId is provided", async () => {
      await coursePackService.findCourse("cxr", 1, 1);

      expect(courseService);

      expect(courseService.findWithUserProgress).toHaveBeenCalled();
    });

    it("should call courseService.find when userId is not provided", async () => {
      const notUserId = "";
      await coursePackService.findCourse(notUserId, 1, 1);

      expect(courseService);

      expect(courseService.find).toHaveBeenCalled();
    });
  });

  describe("findNextCourse", () => {
    it("should call courseService.findNext", async () => {
      await coursePackService.findNextCourse(1, 1);

      expect(courseService.findNext).toHaveBeenCalled();
    });
  });

  describe("completeCourse", () => {
    it("should call courseService.completeCourse", async () => {
      await coursePackService.completeCourse("cxr", 1, 1);

      expect(courseService.completeCourse).toHaveBeenCalled();
    });
  });
});

async function setupTesting() {
  const MockCourseService = {
    findWithUserProgress: jest.fn(),
    find: jest.fn(),
    findNext: jest.fn(),
    completeCourse: jest.fn(),
  };

  const MockCourseHistoryService = {
    findCompletionCount: jest.fn(() => 1),
  };

  const moduleRef = await Test.createTestingModule({
    imports: testImportModules,
    providers: [
      CoursePackService,
      { provide: CourseService, useValue: MockCourseService },
      {
        provide: CourseHistoryService,
        useValue: MockCourseHistoryService,
      },
    ],
  }).compile();

  const courseService = moduleRef.get<CourseService>(CourseService);
  const courseHistoryService = moduleRef.get<CourseHistoryService>(CourseHistoryService);
  const coursePackService = moduleRef.get<CoursePackService>(CoursePackService);

  return {
    moduleRef,
    courseService,
    coursePackService,
    courseHistoryService,
    db: moduleRef.get<DbType>(DB),
  };
}
