import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchStartGame } from "~/api/game";
import { useActiveCourseId } from "~/composables/courses/activeCourse";
import { useGameStore } from "../game";
import { useUserStore } from "../user";

vi.mock("~/api/game");

describe("game store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    const gameStore = useGameStore();
    gameStore.resetGame();
  });

  it("should return courseId 1 for visitors", async () => {
    const gameStore = useGameStore();
    const result = await gameStore.startGame();

    expect(result).toEqual({ courseId: 1 });
  });

  describe("logged-in users", () => {
    beforeEach(() => {
      const userStore = useUserStore();
      userStore.initUser({
        userId: "1",
        nickname: "cxr",
        username: "18518518521",
        phone: "18518518521",
      });

      vi.mocked(fetchStartGame).mockImplementation(() =>
        Promise.resolve({ cId: 2 })
      );
    });

    it("should return cached courseId", async () => {
      // 第一次调用是为了模拟先请求接口 把数据缓存起来
      // 也是属于 setup 的一种方式
      const gameStore = useGameStore();
      await gameStore.startGame();

      const result = await gameStore.startGame();

      // 因为有缓存了 所以只会走一次 api 接口
      expect(fetchStartGame).toBeCalledTimes(1);
      expect(result).toEqual({ courseId: 2 });
    });

    it("should fetch and return new courseId without cache", async () => {
      const gameStore = useGameStore();
      const result = await gameStore.startGame();

      expect(fetchStartGame).toHaveBeenCalled();
      expect(result).toEqual({ courseId: 2 });
    });

    it("should get the courseId again after updating the cache", async () => {
      const gameStore = useGameStore();
      const { updateActiveCourseId } = useActiveCourseId();

      // 其他地方更新了缓存的 activeCourseId
      updateActiveCourseId(999);
      const { courseId } = await gameStore.startGame();

      // 此时 courseId 应该是更新后的数据
      expect(courseId).toEqual(999);
    });
  });
});
