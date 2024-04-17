import { createPinia, setActivePinia } from "pinia";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

import type { ProgressRankVo } from "~/api/rank";
import { fetchProgressRank } from "~/api/rank";
import { cacheRanking, useRanking } from "../rankingList";

const weeklyList: ProgressRankVo = {
  list: [{ username: "user1", count: 1 }],
  self: { username: "user1", count: 1, rank: 1 },
  period: "weekly",
};

const monthlyList: ProgressRankVo = {
  list: [{ username: "user2", count: 2 }],
  self: { username: "user2", count: 2, rank: 1 },
  period: "monthly",
};

const yearlyList: ProgressRankVo = {
  list: [{ username: "user3", count: 3 }],
  self: { username: "user3", count: 3, rank: 1 },
  period: "yearly",
};

function rankList(period: string): ProgressRankVo {
  return period === "weekly" ? weeklyList : period === "monthly" ? monthlyList : yearlyList;
}

vi.mock("~/api/rank");
vi.mocked(fetchProgressRank).mockImplementation(async (period = "weekly") => rankList(period));

describe("rank list", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterAll(() => {
    const rankingStore = useRanking();
    rankingStore.hideRankModal();
  });

  describe("rank modal", () => {
    it("initial the weekly rank list when the modal was showed", async () => {
      const rankingStore = useRanking();

      await rankingStore.showRankModal();

      expect(rankingStore.rankModal).toBe(true);
      expect(rankingStore.rankingList).toEqual(weeklyList.list);
      expect(rankingStore.rankingSelf).toEqual(weeklyList.self);
      expect(cacheRanking().rankingCache).toEqual({ weekly: weeklyList });
    });

    it("hide the modal", () => {
      const rankingStore = useRanking();

      rankingStore.hideRankModal();

      expect(rankingStore.rankModal).toBe(false);
    });
  });

  describe("toggle period", () => {
    describe("no cache", () => {
      it("toggle monthly period", async () => {
        const rankingStore = useRanking();

        rankingStore.togglePeriod("monthly");
        await vi.runAllTimersAsync();

        expect(fetchProgressRank).toBeCalled();
        expectRankPeriod("monthly", monthlyList);
        expect(cacheRanking().rankingCache).toEqual({
          weekly: weeklyList,
          monthly: monthlyList,
        });
      });

      it("toggle yearly period", async () => {
        const rankingStore = useRanking();

        rankingStore.togglePeriod("yearly");
        await vi.advanceTimersToNextTimerAsync();

        expect(fetchProgressRank).toBeCalled();
        expectRankPeriod("yearly", yearlyList);
        expect(cacheRanking().rankingCache).toEqual({
          weekly: weeklyList,
          monthly: monthlyList,
          yearly: yearlyList,
        });
      });
    });

    describe("use cache", () => {
      it("toggle monthly period", async () => {
        const rankingStore = useRanking();

        rankingStore.togglePeriod("monthly");
        await vi.runAllTimersAsync();

        expect(fetchProgressRank).not.toBeCalled();
        expectRankPeriod("monthly", monthlyList);
      });

      it("toggle yearly period", async () => {
        const rankingStore = useRanking();

        rankingStore.togglePeriod("yearly");
        await vi.runAllTimersAsync();

        expect(fetchProgressRank).not.toBeCalled();
        expectRankPeriod("yearly", yearlyList);
      });
    });
  });
});

function expectRankPeriod(period: string, periodList: ProgressRankVo) {
  const rankingStore = useRanking();

  expect(rankingStore.currentPeriod).toBe(period);
  expect(rankingStore.rankingList).toEqual(periodList.list);
  expect(rankingStore.rankingSelf).toEqual(periodList.self);
}
