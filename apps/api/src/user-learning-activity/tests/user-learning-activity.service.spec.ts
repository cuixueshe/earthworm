import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { cleanDB, testImportModules } from "../../../test/helper/utils";
import { endDB } from "../../common/db";
import { DB, DbType } from "../../global/providers/db.provider";
import { UserLearningActivityService } from "../user-learning-activity.service";

describe("UserLearningActivityService", () => {
  let db: DbType;
  let userLearningActivityService: UserLearningActivityService;

  beforeAll(async () => {
    const testHelper = await setupTesting();
    db = testHelper.db;
    userLearningActivityService = testHelper.userLearningActivityService;
  });

  afterAll(async () => {
    await cleanDB(db);
    await endDB();
  });

  beforeEach(async () => {
    await cleanDB(db);
  });

  describe("getDailyTotalTime", () => {
    const userId = "testUser";
    const activityType = "daily_total";

    beforeEach(async () => {
      await userLearningActivityService.upsertActivity(
        userId,
        new Date("2024-04-10"),
        activityType,
        3600,
      );
      await userLearningActivityService.upsertActivity(
        userId,
        new Date("2024-04-15"),
        activityType,
        7200,
      );
      await userLearningActivityService.upsertActivity(
        userId,
        new Date("2024-04-20"),
        activityType,
        5400,
      );
    });

    it("should return daily totals within the specified date range", async () => {
      const result = await userLearningActivityService.getDailyTotalTime(
        userId,
        activityType,
        new Date("2024-04-01"),
        new Date("2024-04-30"),
      );
      expect(result).toEqual([
        { date: "2024-04-10", duration: 3600 },
        { date: "2024-04-15", duration: 7200 },
        { date: "2024-04-20", duration: 5400 },
      ]);
    });

    it("should return all data when no date range is specified", async () => {
      const result = await userLearningActivityService.getDailyTotalTime(userId, activityType);
      expect(result.length).toBe(3);
    });

    it("should return data from start date to now when only start date is provided", async () => {
      const result = await userLearningActivityService.getDailyTotalTime(
        userId,
        activityType,
        new Date("2024-04-15"),
      );
      expect(result).toEqual([
        { date: "2024-04-15", duration: 7200 },
        { date: "2024-04-20", duration: 5400 },
      ]);
    });

    it("should return data up to end date when only end date is provided", async () => {
      const result = await userLearningActivityService.getDailyTotalTime(
        userId,
        activityType,
        undefined,
        new Date("2024-04-15"),
      );
      expect(result).toEqual([
        { date: "2024-04-10", duration: 3600 },
        { date: "2024-04-15", duration: 7200 },
      ]);
    });

    it("should return an empty array when no data in the specified range", async () => {
      const result = await userLearningActivityService.getDailyTotalTime(
        userId,
        activityType,
        new Date("2025-01-01"),
        new Date("2025-12-31"),
      );
      expect(result).toEqual([]);
    });

    it("should handle data spanning multiple months/years", async () => {
      await userLearningActivityService.upsertActivity(
        userId,
        new Date("2023-12-31"),
        activityType,
        3600,
      );
      await userLearningActivityService.upsertActivity(
        userId,
        new Date("2025-01-01"),
        activityType,
        3600,
      );
      const result = await userLearningActivityService.getDailyTotalTime(userId, activityType);
      expect(result.length).toBe(5);
    });

    it("should aggregate multiple learning records for a single day", async () => {
      await userLearningActivityService.upsertActivity(
        userId,
        new Date("2024-04-10"),
        activityType,
        1800,
      );
      const result = await userLearningActivityService.getDailyTotalTime(
        userId,
        activityType,
        new Date("2024-04-10"),
        new Date("2024-04-10"),
      );
      expect(result).toEqual([{ date: "2024-04-10", duration: 5400 }]);
    });

    it("should return empty array for non-existent user", async () => {
      const result = await userLearningActivityService.getDailyTotalTime(
        "nonExistentUser",
        activityType,
      );
      expect(result).toEqual([]);
    });
  });

  describe("getTotalLearningTime", () => {
    const userId = "testUser";
    const activityType = "daily_total";

    beforeEach(async () => {
      await userLearningActivityService.upsertActivity(
        userId,
        new Date("2024-04-10"),
        activityType,
        3600,
      );
      await userLearningActivityService.upsertActivity(
        userId,
        new Date("2024-04-15"),
        activityType,
        7200,
      );
      await userLearningActivityService.upsertActivity(
        userId,
        new Date("2024-04-20"),
        activityType,
        5400,
      );
    });

    it("should return total learning time for a user", async () => {
      const result = await userLearningActivityService.getTotalLearningTime(userId, activityType);
      expect(result).toEqual(16200);
    });

    it("should return total time within specified date range", async () => {
      const result = await userLearningActivityService.getTotalLearningTime(
        userId,
        activityType,
        new Date("2024-04-10"),
        new Date("2024-04-15"),
      );
      expect(result).toEqual(10800);
    });

    it("should return total time from start date to now when only start date is provided", async () => {
      const result = await userLearningActivityService.getTotalLearningTime(
        userId,
        activityType,
        new Date("2024-04-15"),
      );
      expect(result).toEqual(12600);
    });

    it("should return total time up to end date when only end date is provided", async () => {
      const result = await userLearningActivityService.getTotalLearningTime(
        userId,
        activityType,
        undefined,
        new Date("2024-04-15"),
      );
      expect(result).toEqual(10800);
    });

    it("should return zero time when no data in specified range", async () => {
      const result = await userLearningActivityService.getTotalLearningTime(
        userId,
        activityType,
        new Date("2025-01-01"),
        new Date("2025-12-31"),
      );
      expect(result).toEqual(0);
    });

    it("should handle total time spanning multiple months/years", async () => {
      await userLearningActivityService.upsertActivity(
        userId,
        new Date("2023-12-31"),
        activityType,
        3600,
      );
      await userLearningActivityService.upsertActivity(
        userId,
        new Date("2025-01-01"),
        activityType,
        3600,
      );
      const result = await userLearningActivityService.getTotalLearningTime(userId, activityType);
      expect(result).toEqual(23400);
    });

    it("should return zero time for non-existent user", async () => {
      const result = await userLearningActivityService.getTotalLearningTime(
        "nonExistentUser",
        activityType,
      );
      expect(result).toEqual(0);
    });
  });

  describe("upsertActivity", () => {
    const userId = "testUser";
    const activityType = "daily_total";

    it("should insert a new learning activity record", async () => {
      await userLearningActivityService.upsertActivity(
        userId,
        new Date("2024-04-10"),
        activityType,
        3600,
      );
      const result = await userLearningActivityService.getDailyTotalTime(
        userId,
        activityType,
        new Date("2024-04-10"),
        new Date("2024-04-10"),
      );
      expect(result).toEqual([{ date: "2024-04-10", duration: 3600 }]);
    });

    it("should update an existing learning activity record", async () => {
      await userLearningActivityService.upsertActivity(
        userId,
        new Date("2024-04-10"),
        activityType,
        3600,
      );
      await userLearningActivityService.upsertActivity(
        userId,
        new Date("2024-04-10"),
        activityType,
        1800,
      );
      const result = await userLearningActivityService.getDailyTotalTime(
        userId,
        activityType,
        new Date("2024-04-10"),
        new Date("2024-04-10"),
      );
      expect(result).toEqual([{ date: "2024-04-10", duration: 5400 }]);
    });

    it("should handle different activity types separately", async () => {
      await userLearningActivityService.upsertActivity(
        userId,
        new Date("2024-04-10"),
        activityType,
        3600,
      );
      await userLearningActivityService.upsertActivity(
        userId,
        new Date("2024-04-10"),
        "course_time",
        1800,
      );
      const result = await userLearningActivityService.getDailyTotalTime(
        userId,
        activityType,
        new Date("2024-04-10"),
        new Date("2024-04-10"),
      );
      expect(result).toEqual([{ date: "2024-04-10", duration: 3600 }]);
    });

    it("should reject negative duration", async () => {
      await expect(
        userLearningActivityService.upsertActivity(
          userId,
          new Date("2024-04-10"),
          activityType,
          -3600,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid date format", async () => {
      await expect(
        userLearningActivityService.getDailyTotalTime(
          "userId",
          "daily_total",
          new Date("invalid-date"),
        ),
      ).rejects.toThrow();
    });

    it("should handle end date earlier than start date", async () => {
      const result = await userLearningActivityService.getDailyTotalTime(
        "userId",
        "daily_total",
        new Date("2024-04-20"),
        new Date("2024-04-10"),
      );
      expect(result).toEqual([]);
    });
  });
});

async function setupTesting() {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: testImportModules,
    providers: [UserLearningActivityService],
  }).compile();

  return {
    db: moduleRef.get<DbType>(DB),
    userLearningActivityService: moduleRef.get<UserLearningActivityService>(
      UserLearningActivityService,
    ),
  };
}
