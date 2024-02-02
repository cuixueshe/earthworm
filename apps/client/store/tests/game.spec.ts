import { beforeEach, it, expect, describe, vi } from "vitest";
import { useGameStore } from "../game";
import { setActivePinia, createPinia } from "pinia";
import { useUserStore } from "../user";
import { fetchStartGame } from "~/api/game";

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
        username: "cxr",
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
  });
});
