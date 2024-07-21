import { Test, TestingModule } from "@nestjs/testing";

import { insertCourse, insertCoursePack } from "../../../test/fixture/db";
import { cleanDB, testImportModules } from "../../../test/helper/utils";
import { endDB } from "../../common/db";
import { DB, DbType } from "../../global/providers/db.provider";
import { LogtoService } from "../../logto/logto.service";
import { MembershipService } from "../../membership/membership.service";
import { UserCourseProgressService } from "../../user-course-progress/user-course-progress.service";
import { UserService } from "../user.service";

describe("UserService", () => {
  let db: DbType;
  let userService: UserService;
  let logtoServiceMock: jest.Mocked<LogtoService>;
  let membershipServiceMock: jest.Mocked<MembershipService>;
  let userCourseProgressServiceMock: jest.Mocked<UserCourseProgressService>;

  beforeAll(async () => {
    const testHelper = await setupTesting();
    db = testHelper.db;
    userService = testHelper.userService;
    logtoServiceMock = testHelper.logtoService as jest.Mocked<LogtoService>;
    membershipServiceMock = testHelper.membershipService as jest.Mocked<MembershipService>;
    userCourseProgressServiceMock =
      testHelper.userCourseProgressService as jest.Mocked<UserCourseProgressService>;
  });

  afterAll(async () => {
    await cleanDB(db);
    await endDB();
  });

  beforeEach(async () => {
    await cleanDB(db);
    jest.clearAllMocks();
  });

  describe("findUser", () => {
    it("should return user info with membership details", async () => {
      const userId = "testUserId";
      const logtoUserInfo = { id: userId, name: "Test User" };
      const membershipDetails = {
        type: "founder",
        startDate: new Date(),
        endDate: new Date(),
        isActive: true,
      };

      (logtoServiceMock.logtoApi.get as jest.Mock).mockResolvedValue({ data: logtoUserInfo });
      membershipServiceMock.isMember.mockResolvedValue(true);
      membershipServiceMock.getMembershipDetails.mockResolvedValue(membershipDetails);

      const result = await userService.findUser(userId);

      expect(result).toEqual({
        ...logtoUserInfo,
        membership: {
          isMember: true,
          details: membershipDetails,
        },
      });
    });

    it("should return undefined on error", async () => {
      const userId = "testUserId";
      (logtoServiceMock.logtoApi.get as jest.Mock).mockRejectedValue(new Error("API Error"));

      const result = await userService.findUser(userId);

      expect(result).toBeUndefined();
    });
  });

  describe("findCurrentUser", () => {
    it("should return membership info for current user", async () => {
      const userId = "testUserId";
      const membershipDetails = {
        type: "founder",
        startDate: new Date(),
        endDate: new Date(),
        isActive: true,
      };

      membershipServiceMock.isMember.mockResolvedValue(true);
      membershipServiceMock.getMembershipDetails.mockResolvedValue(membershipDetails);

      const result = await userService.findCurrentUser(userId);

      expect(result).toEqual({
        membership: {
          isMember: true,
          details: membershipDetails,
        },
      });
    });

    it("should return undefined on error", async () => {
      const userId = "testUserId";
      membershipServiceMock.isMember.mockRejectedValue(new Error("Service Error"));

      const result = await userService.findCurrentUser(userId);

      expect(result).toBeUndefined();
    });
  });

  describe("setupNewUser", () => {
    it("should setup a new user with provided username and avatar", async () => {
      const user = { userId: "newUserId" };
      const dto = { username: "newUser", avatar: "custom-avatar.png" };
      jest.spyOn(userService as any, "updateUser").mockResolvedValue({});

      const coursePackEntity = await insertCoursePack(db);
      const courseEntity = await insertCourse(db, coursePackEntity.id);

      const result = await userService.setupNewUser(user, dto);

      expect(result).toEqual({
        avatar: dto.avatar,
        username: dto.username,
      });
      expect(userService.updateUser).toHaveBeenCalledWith(user, dto);
      expect(userCourseProgressServiceMock.upsert).toHaveBeenCalledWith(
        user.userId,
        coursePackEntity.id,
        courseEntity.id,
        0,
      );
    });

    it("should use default avatar if not provided", async () => {
      const user = { userId: "newUserId" };
      const dto = { username: "newUser", avatar: "" };
      jest.spyOn(userService as any, "updateUser").mockResolvedValue({});
      jest.spyOn(userService as any, "getRandomNumber").mockReturnValue(5); // 模拟随机数
      const coursePackEntity = await insertCoursePack(db);
      const courseEntity = await insertCourse(db, coursePackEntity.id);
      const result = await userService.setupNewUser(user, dto);

      const expectedAvatar =
        "https://earthworm-prod-1312884695.cos.ap-beijing.myqcloud.com/avatars/avatar5.png";
      expect(result).toEqual({
        avatar: expectedAvatar,
        username: dto.username,
      });
      expect(userService.updateUser).toHaveBeenCalledWith(user, {
        username: dto.username,
        avatar: expectedAvatar,
      });
      expect(userCourseProgressServiceMock.upsert).toHaveBeenCalledWith(
        user.userId,
        coursePackEntity.id,
        courseEntity.id,
        0,
      );
    });
  });
});

async function setupTesting() {
  const logtoServiceMock = {
    logtoApi: {
      get: jest.fn(),
      patch: jest.fn(),
    },
  };

  const membershipServiceMock = {
    isMember: jest.fn(),
    getMembershipDetails: jest.fn(),
  };
  const userCourseProgressServiceMock = {
    upsert: jest.fn(),
  };

  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: testImportModules,
    providers: [
      UserService,
      { provide: LogtoService, useValue: logtoServiceMock },
      { provide: MembershipService, useValue: membershipServiceMock },
      { provide: UserCourseProgressService, useValue: userCourseProgressServiceMock },
    ],
  }).compile();

  return {
    db: moduleRef.get<DbType>(DB),
    userService: moduleRef.get<UserService>(UserService),
    logtoService: moduleRef.get<LogtoService>(LogtoService),
    membershipService: moduleRef.get<MembershipService>(MembershipService),
    userCourseProgressService: moduleRef.get<UserCourseProgressService>(UserCourseProgressService),
  };
}
