import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { createId } from "@paralleldrive/cuid2";

import type { DbType } from "../../global/providers/db.provider";
import { insertCourse, insertCoursePack } from "../../../test/fixture/db";
import { cleanDB, testImportModules } from "../../../test/helper/utils";
import { endDB } from "../../common/db";
import { CourseHistoryService } from "../../course-history/course-history.service";
import { CourseService } from "../../course/course.service";
import { DB } from "../../global/providers/db.provider";
import { MembershipService } from "../../membership/membership.service";
import { CoursePackService } from "../course-pack.service";

describe("CoursePackService", () => {
  let db: DbType;
  let coursePackService: CoursePackService;
  let courseService: CourseService;

  const fakeCoursePackId = createId();
  const fakeCourseId = createId();
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
    it("should return all course packs including private and public", async () => {
      await insertCoursePack(db, { creatorId: "admin", shareLevel: "public" });
      await insertCoursePack(db, { creatorId: "user1", shareLevel: "public" });

      const result = await coursePackService.findAll("user1");

      expect(result.length).toBe(2); // user1's private and public packs
    });

    it("should return only public course packs", async () => {
      await insertCoursePack(db, { creatorId: "admin", shareLevel: "public" });
      await insertCoursePack(db, { creatorId: "admin", shareLevel: "public" });
      await insertCoursePack(db, { creatorId: "user2", shareLevel: "private" });

      const result = await coursePackService.findAllPublicCoursePacks();

      expect(result.length).toBe(2); // all public packs
    });

    it("should return only private course packs and public course packs for a specific user", async () => {
      await insertCoursePack(db, { creatorId: "user1", shareLevel: "private" });
      await insertCoursePack(db, { creatorId: "admin", shareLevel: "public" });
      await insertCoursePack(db, { creatorId: "user2", shareLevel: "private" });

      const result = await coursePackService.findAll("user1");

      expect(result.length).toBe(2); // user1's private pack
    });

    it("should return all course packs including founder_only for a founder member", async () => {
      await insertCoursePack(db, { creatorId: "founderUser", shareLevel: "private" });
      await insertCoursePack(db, { creatorId: "admin", shareLevel: "founder_only" });

      const result = await coursePackService.findAll("founderUser");

      expect(result.length).toBe(2); // founderUser's private pack and founder_only pack
    });

    it("should return only private course packs for a non-founder member", async () => {
      await insertCoursePack(db, { creatorId: "nonFounderUser", shareLevel: "private" });
      await insertCoursePack(db, { creatorId: "admin", shareLevel: "founder_only" });

      const result = await coursePackService.findAll("nonFounderUser");

      expect(result.length).toBe(1); // nonFounderUser's private pack
    });
  });

  describe("findOne", () => {
    it("should return a course pack for a valid ID", async () => {
      const coursePackEntity = await insertCoursePack(db);

      const result = await coursePackService.findOne(coursePackEntity.id);

      expect(result).toEqual(coursePackEntity);
    });

    it("should throw NotFoundException for an invalid ID", async () => {
      await expect(coursePackService.findOne(createId())).rejects.toThrow(NotFoundException);
    });
  });

  describe("findOneWithCourses", () => {
    it("should return a course pack with courses and completion counts when userId is provided and course pack is public", async () => {
      const userId = "cxr";
      const coursePackEntity = await insertCoursePack(db, { shareLevel: "public" });
      await insertCourse(db, coursePackEntity.id);

      const result = await coursePackService.findOneWithCourses(userId, coursePackEntity.id);

      expect(result.courses.length).toBe(1);
      expect(result.courses[0]).toHaveProperty("completionCount");
    });

    it("should return a course pack with courses and completion counts when userId is provided and course pack is private but user is the creator", async () => {
      const userId = "cxr";
      const coursePackEntity = await insertCoursePack(db, {
        shareLevel: "private",
        creatorId: userId,
      });
      await insertCourse(db, coursePackEntity.id);

      const result = await coursePackService.findOneWithCourses(userId, coursePackEntity.id);

      expect(result.courses.length).toBe(1);
      expect(result.courses[0]).toHaveProperty("completionCount");
    });

    it("should throw NotFoundException when course pack ID does not exist", async () => {
      const userId = "cxr";
      const nonExistentCoursePackId = "non-existent-id";

      await expect(
        coursePackService.findOneWithCourses(userId, nonExistentCoursePackId),
      ).rejects.toThrow(NotFoundException);
    });

    it("should throw NotFoundException when course pack is private and user is not the creator", async () => {
      const userId = "cxr";
      const coursePackEntity = await insertCoursePack(db, {
        shareLevel: "private",
        creatorId: "another-user-id",
      });
      await insertCourse(db, coursePackEntity.id);

      await expect(
        coursePackService.findOneWithCourses(userId, coursePackEntity.id),
      ).rejects.toThrow(NotFoundException);
    });

    it("should return a course pack with courses without completion counts when userId is not provided", async () => {
      const notUserId = "";
      const coursePackEntity = await insertCoursePack(db, { shareLevel: "public" });
      await insertCourse(db, coursePackEntity.id);

      const result = await coursePackService.findOneWithCourses(notUserId, coursePackEntity.id);

      expect(result.courses.length).toBe(1);
      expect(result.courses[0]).not.toHaveProperty("completionCount");
    });

    it("should return a course pack with courses and completion counts when userId is provided and user is a founder member", async () => {
      const userId = "founderUser";
      const coursePackEntity = await insertCoursePack(db, {
        shareLevel: "founder_only",
        creatorId: "another-user-id", // The creator can be different from the founder member
      });
      await insertCourse(db, coursePackEntity.id);

      const result = await coursePackService.findOneWithCourses(userId, coursePackEntity.id);

      expect(result.courses.length).toBe(1);
      expect(result.courses[0]).toHaveProperty("completionCount");
    });

    it("should throw NotFoundException when course pack is founder_only and user is not a founder member", async () => {
      const userId = "nonFounderUser";
      const coursePackEntity = await insertCoursePack(db, {
        shareLevel: "founder_only",
        creatorId: "another-user-id", // The creator can be different from the non-founder member
      });
      await insertCourse(db, coursePackEntity.id);

      await expect(
        coursePackService.findOneWithCourses(userId, coursePackEntity.id),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("findCourse", () => {
    it("should call courseService.findWithUserProgress when userId is provided", async () => {
      await coursePackService.findCourse("cxr", fakeCoursePackId, fakeCourseId);

      expect(courseService);

      expect(courseService.findWithUserProgress).toHaveBeenCalled();
    });

    it("should call courseService.find when userId is not provided", async () => {
      const notUserId = "";
      await coursePackService.findCourse(notUserId, fakeCoursePackId, fakeCourseId);

      expect(courseService);

      expect(courseService.find).toHaveBeenCalled();
    });
  });

  describe("findNextCourse", () => {
    it("should call courseService.findNext", async () => {
      await coursePackService.findNextCourse(fakeCoursePackId, fakeCourseId);

      expect(courseService.findNext).toHaveBeenCalled();
    });
  });

  describe("completeCourse", () => {
    it("should call courseService.completeCourse", async () => {
      await coursePackService.completeCourse("cxr", fakeCoursePackId, fakeCourseId);

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

  const MockMembershipService = {
    isFounderMembership: jest.fn((userId) => userId === "founderUser"),
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
      {
        provide: MembershipService,
        useValue: MockMembershipService,
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
