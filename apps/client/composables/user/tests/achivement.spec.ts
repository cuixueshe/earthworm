import { beforeEach, describe, expect, it, vi } from "vitest";
import type { UserInfo } from "~/api/achievement";
import {
  fetchAllAchievements,
  fetchAuthUser,
  fetchHaveAchievement,
  fetchPubAchievement,
  fetchSetUsing,
} from "~/api/achievement";
import { useAchievement, type AchievementItem } from "../achievement";

vi.mock("~/api/achievement", () => ({
  fetchAllAchievements: vi.fn(),
  fetchHaveAchievement: vi.fn(),
  fetchSetUsing: vi.fn(),
  fetchAuthUser: vi.fn(),
  fetchPubAchievement: vi.fn(),
}));

describe("useAchievement", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });
  describe("achievement list", () => {
    it("should initialize achievement list when called", async () => {
      // 是否正确初始化了成就列表
      const { getAchievementList, achievementList } = useAchievement();
      const mockAchievements: AchievementItem[] = [
        { id: 1, name: "Achievement 1", description: "Description 1" },
        { id: 2, name: "Achievement 2", description: "Description 2" },
      ];

      vi.mocked(fetchAllAchievements).mockResolvedValue(mockAchievements);

      // 调用获取成就列表函数
      await getAchievementList();

      // 检查是否正确初始化了成就列表
      expect(achievementList.value).toEqual(mockAchievements);
    });

    it("should show modal when handleOpenAwardDialog is called with checked achievements", () => {
      const {
        handleOpenAwardDialog,
        isShowModal,
        achievementList,
        checkedAchievement,
      } = useAchievement();
      const mockAchievement: AchievementItem[] = [
        {
          id: 1,
          name: "Achievement 1",
          description: "Description 1",
          isChecked: true,
        },
        {
          id: 2,
          name: "Achievement 2",
          description: "Description 2",
        },
      ];
      const mockCheckedAchievement: AchievementItem[] = [
        {
          id: 1,
          name: "Achievement 1",
          description: "Description 1",
          isChecked: true,
        },
      ];

      // 模拟成就列表中有选中的成就
      achievementList.value = mockAchievement;
      // 将选中的成就赋值给选中的成就对象
      checkedAchievement.value = mockCheckedAchievement;

      // 调用打开颁奖对话框函数
      handleOpenAwardDialog();

      // 检查是否显示了模态框
      expect(isShowModal.value).toBe(true);
    });

    it("should not show modal when handleOpenAwardDialog is called without checked achievements", () => {
      const { handleOpenAwardDialog, isShowModal, achievementList } =
        useAchievement();

      // 模拟成就列表中没有选中的成就
      achievementList.value = [
        {
          id: 1,
          name: "Achievement 1",
          description: "Description 1",
        },
        {
          id: 2,
          name: "Achievement 2",
          description: "Description 2",
        },
      ];

      // 调用打开颁奖对话框函数
      handleOpenAwardDialog();

      // 检查是否未显示模态框
      expect(isShowModal.value).toBe(false);
    });

    // 表单正确时是否会调用 handleAwardAchievement 函数
    it("should call handleAwardAchievement when the form is right and submitted", async () => {
      const { handleOpenAwardDialog, handleAwardAchievement } =
        useAchievement();

      // 调用打开颁奖对话框函数
      handleOpenAwardDialog();

      // 主要是获取到对应的 id
      const mockUserInfo: UserInfo = {
        id: 1,
        name: "user1",
        phone: "123456789",
        password: "password",
      };

      const mockPrams = {
        phone: "123456789",
        secretKey: "123456",
      };

      await handleAwardAchievement(mockPrams);

      expect(fetchAuthUser).toBeCalled();
      expect(fetchPubAchievement).toBeCalled();
    });
    it("should reset the checked status of achievements when the form is submitted successfully", async () => {
      const { handleAwardAchievement, achievementList } = useAchievement();

      const mockPrams = {
        phone: "123456789",
        secretKey: "123456",
      };
      // 成功调用颁发成就后会重置成就的选中状态
      await handleAwardAchievement(mockPrams);

      const mockCurrentAchievementList = achievementList.value.every(
        (item) => !item.isChecked
      );

      // 检查是否重置了成就的选中状态
      expect(mockCurrentAchievementList).toBe(true);
    });
    // 测试取消颁发成就
    it("should award the achievements achievements when the dialog is cancelled", () => {
      const { handleCancel, isShowModal } = useAchievement();

      let mockPrams = {
        phone: "123456789",
        secretKey: "123456",
      };
      // resetForm 重置表单的值
      function resetForm() {
        mockPrams = {
          phone: "",
          secretKey: "",
        };
      }

      // 取消颁发成就后会重置成就的选中状态
      handleCancel(resetForm);

      expect(isShowModal.value).toBe(false);
      expect(mockPrams).toEqual({
        phone: "",
        secretKey: "",
      });
    });
  });

  describe("user achievement list", () => {
    it("should initialize userAchievement list when called", async () => {
      const { initUserAchievementList, userAchievementList } = useAchievement();
      const mockUserAchievements: AchievementItem[] = [
        { id: 1, name: "Achievement 1", description: "Description 1" },
        { id: 2, name: "Achievement 2", description: "Description 2" },
      ];

      vi.mocked(fetchHaveAchievement).mockResolvedValue(mockUserAchievements);

      await initUserAchievementList();

      expect(userAchievementList.value).toEqual(mockUserAchievements);
    });

    it("should set the first achievement as active when the user has no active achievements", async () => {
      const { initUserAchievementList, userAchievementList } = useAchievement();
      const mockUserAchievements: AchievementItem[] = [
        { id: 1, name: "Achievement 1", description: "Description 1" },
        { id: 2, name: "Achievement 2", description: "Description 2" },
      ];

      userAchievementList.value = mockUserAchievements;

      await initUserAchievementList();

      expect(userAchievementList.value[0].isActive).toBe(true);
    });

    it("should set the achievements as active when the user change the active achievement", async () => {
      const {
        handleChangeAchievementActive,
        userAchievement,
        userAchievementList,
        isShowModal,
      } = useAchievement();

      const mockUserAchievements: AchievementItem = {
        id: 1,
        name: "Achievement 1",
        description: "Description 1",
      };

      const mockUserAchievementsList: AchievementItem[] = [
        {
          id: 1,
          name: "Achievement 1",
          description: "Description 1",
        },
        {
          id: 2,
          name: "Achievement 2",
          description: "Description 2",
          isActive: true,
        },
      ];

      userAchievement.value = mockUserAchievements;

      userAchievementList.value = mockUserAchievementsList;

      await handleChangeAchievementActive();

      expect(fetchSetUsing).toBeCalled();
      expect(userAchievement.value.isActive).toBe(true);
      expect(userAchievementList.value.every((x) => !x.isActive)).toBe(true);
      expect(isShowModal.value).toBe(false);
    });
  });
});
