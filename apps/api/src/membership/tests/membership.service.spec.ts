import { Test, TestingModule } from "@nestjs/testing";
import { DbType } from "src/global/providers/db.provider";

import { membership } from "@earthworm/schema";
import { cleanDB, testImportModules } from "../../../test/helper/utils";
import { endDB } from "../../common/db";
import { DB } from "../../global/providers/db.provider";
import { MembershipPeriod } from "../dto/buy-membership.dto";
import { MembershipService } from "../membership.service";

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

  it("should return isActive as true and the correct endDate for an active membership", async () => {
    const { userId, endDate } = await insertMembership(db, true);

    // Act
    const result = await service.checkMembership(userId);

    // Assert
    expect(result.isActive).toBe(true);
    expect(result.endDate).toEqual(endDate);
  });

  it("should return isActive as false and the correct endDate for an expired membership", async () => {
    const { userId, endDate } = await insertMembership(db, false);

    // Act
    const result = await service.checkMembership(userId);

    // Assert
    expect(result.isActive).toBe(false);
    expect(result.endDate).toEqual(endDate);
  });

  it("should return isActive as false and endDate as null for a non-member", async () => {
    // Act
    const result = await service.checkMembership("cxr");

    // Assert
    expect(result.isActive).toBe(false);
    expect(result.endDate).toBeNull();
  });

  it("should deactivate expired memberships correctly", async () => {
    const { endDate, userId } = await insertMembership(db, true);

    const today = new Date(endDate);
    today.setMonth(endDate.getMonth() + 1);

    await service.deactivateExpiredMemberships(today);

    const result = await service.checkMembership(userId);

    expect(result.isActive).toBe(false);
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
  });

  return {
    userId,
    startDate: currentDate,
    endDate: expiredEndDate,
    isActive,
  };
}
