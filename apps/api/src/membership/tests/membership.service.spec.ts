import { Test, TestingModule } from "@nestjs/testing";
import { DbType } from "src/global/providers/db.provider";

import { membership } from "@earthworm/schema";
import { cleanDB, testImportModules } from "../../../test/helper/utils";
import { endDB } from "../../common/db";
import { DB } from "../../global/providers/db.provider";
import { MembershipPeriod } from "../dto/buy-membership.dto";
import { MembershipService } from "../membership.service";
import { MembershipType } from "../types/membership.types";

describe("MembershipService", () => {
  let service: MembershipService;
  let db: DbType;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: testImportModules,
      providers: [MembershipService],
    }).compile();

    db = module.get<DbType>(DB);

    service = module.get<MembershipService>(MembershipService);
  });

  beforeEach(async () => {
    await cleanDB(db);
  });

  afterAll(async () => {
    await cleanDB(db);
    await endDB();
  });

  it("should create a new membership record for a new user", async () => {
    const buyMembershipDto = { userId: "new-cxr", period: MembershipPeriod.MONTH, duration: 1 };

    const startDate = new Date("2024-01-01");
    const { endDate } = await service.upsert(startDate, buyMembershipDto);

    expect(endDate.getMonth()).toBe(1);
  });

  it("should extend the end date of an active membership", async () => {
    const { userId, startDate, endDate } = await insertMembership(db, true);

    const buyMembershipDto = { userId, period: MembershipPeriod.MONTH, duration: 1 };

    const result = await service.upsert(startDate, buyMembershipDto);

    expect(result.endDate.getMonth()).toBe(endDate.getMonth() + 1);
  });

  it("should reactivate and set a new end date for an expired membership", async () => {
    const { userId } = await insertMembership(db, false);

    const buyMembershipDto = { userId, period: MembershipPeriod.MONTH, duration: 1 };

    // Act
    const startDate = new Date("2024-04-01");
    const result = await service.upsert(startDate, buyMembershipDto);

    expect(result.endDate.getMonth()).toBe(startDate.getMonth() + 1);
  });

  describe("isMember", () => {
    it("should return true for an active member", async () => {
      const { userId } = await insertMembership(db, true);
      const result = await service.isMember(userId);
      expect(result).toBe(true);
    });

    it("should return false for an inactive member", async () => {
      const { userId } = await insertMembership(db, false);
      const result = await service.isMember(userId);
      expect(result).toBe(false);
    });

    it("should return false for a non-member", async () => {
      const result = await service.isMember("nonexistent-user");
      expect(result).toBe(false);
    });
  });

  describe("getMembershipDetails", () => {
    it("should return correct details for an active member", async () => {
      const { userId, startDate, endDate } = await insertMembership(db, true);
      const result = await service.getMembershipDetails(userId);
      expect(result).toEqual({
        startDate: startDate,
        endDate: endDate,
        type: MembershipType.REGULAR,
      });
    });

    it("should return null for an inactive member", async () => {
      const { userId } = await insertMembership(db, false);
      const result = await service.getMembershipDetails(userId);
      expect(result).toBeUndefined();
    });

    it("should return null for a non-member", async () => {
      const result = await service.getMembershipDetails("nonexistent-user");
      expect(result).toBeUndefined();
    });
  });

  it("should return true if the user is a founder member", async () => {
    const userId = "founderUser";
    await db.insert(membership).values({
      userId,
      type: "founder",
      start_date: new Date(),
      end_date: new Date(),
      isActive: true,
    });

    const result = await service.isFounderMembership(userId);

    expect(result).toBe(true);
  });

  it("should return false if the user is not a founder member", async () => {
    const userId = "nonFounderUser";
    await db.insert(membership).values({
      userId,
      type: MembershipType.REGULAR,
      start_date: new Date(),
      end_date: new Date(),
      isActive: true,
    });

    const result = await service.isFounderMembership(userId);

    expect(result).toBe(false);
  });

  it("should return false if the user has no membership record", async () => {
    const userId = "noMembershipUser";

    const result = await service.isFounderMembership(userId);

    expect(result).toBe(false);
  });
});

async function insertMembership(db: DbType, isActive: boolean) {
  const userId = "cxr";
  const currentDate = new Date("2024-01-01");
  const expiredEndDate = new Date(currentDate);
  expiredEndDate.setMonth(expiredEndDate.getMonth() + 1);
  await db.insert(membership).values({
    userId,
    start_date: currentDate,
    end_date: expiredEndDate,
    isActive,
    type: MembershipType.REGULAR,
  });

  return {
    userId,
    startDate: currentDate,
    endDate: expiredEndDate,
    isActive,
  };
}
