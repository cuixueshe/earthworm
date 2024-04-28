import { Test, TestingModule } from "@nestjs/testing";

import { cleanDB, testImportModules } from "../../../test/helper/utils";
import { endDB } from "../../common/db";
import { DB, DbType } from "../../global/providers/db.provider";
import { UserLearnRecordService } from "../user-learn-record.service";

describe("user learn record service", () => {
  let db: DbType;
  let userLearnRecordService: UserLearnRecordService;

  beforeAll(async () => {
    const testHelper = await setupTesting();

    db = testHelper.db;
    userLearnRecordService = testHelper.userLearnRecordService;
  });

  afterAll(async () => {
    await cleanDB(db);
    await endDB();
  });

  beforeEach(async () => {
    await cleanDB(db);
  });

  describe("find", () => {
    const userId = "cxr";
    beforeEach(async () => {
      await userLearnRecordService.upsert(userId, new Date("2024-04-10"));
      await userLearnRecordService.upsert(userId, new Date("2024-04-15"));
      await userLearnRecordService.upsert(userId, new Date("2024-04-20"));
    });

    it("should return learn records for a user within the specified date range", async () => {
      const dto = {
        startDate: "2024-04-01",
        endDate: "2024-04-30",
      };

      const result = await userLearnRecordService.find(userId, dto);

      expect(result.totalCount).toBe(3);
      expect(result.list).toEqual([
        { day: "2024-04-10", count: 1 },
        { day: "2024-04-15", count: 1 },
        { day: "2024-04-20", count: 1 },
      ]);
    });

    it("should handle cases with no startDate or endDate defined", async () => {
      const dto = {};

      const result = await userLearnRecordService.find(userId, dto);

      // 由于没有指定日期范围，应返回该用户的所有学习记录
      expect(result.totalCount).toBe(3);
    });

    it("should return an empty list if no records match the criteria", async () => {
      const dto = {
        startDate: "2025-01-01",
        endDate: "2025-12-31",
      };

      const result = await userLearnRecordService.find(userId, dto);

      expect(result.totalCount).toEqual(0);
      expect(result.list.length).toEqual(0);
    });

    it("should return all records after the startDate if only startDate is provided", async () => {
      const dto = {
        startDate: "2024-04-15",
      };

      const result = await userLearnRecordService.find(userId, dto);

      expect(result.totalCount).toBe(2);
      expect(result.list).toEqual([
        { day: "2024-04-15", count: 1 },
        { day: "2024-04-20", count: 1 },
      ]);
    });

    it("should return all records before the endDate if only endDate is provided", async () => {
      const dto = {
        endDate: "2024-04-15",
      };

      const result = await userLearnRecordService.find(userId, dto);

      expect(result.totalCount).toBe(2);
      expect(result.list).toEqual([
        { day: "2024-04-10", count: 1 },
        { day: "2024-04-15", count: 1 },
      ]);
    });
  });
});

async function setupTesting() {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: testImportModules,
    providers: [UserLearnRecordService],
  }).compile();
  return {
    db: moduleRef.get<DbType>(DB),
    userLearnRecordService: moduleRef.get<UserLearnRecordService>(UserLearnRecordService),
  };
}
