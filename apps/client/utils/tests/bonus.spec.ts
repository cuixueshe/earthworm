import { beforeEach, describe, expect, it, vi } from "vitest";

import { isTheFirstDayOfLunarYear, isTheLastDayOfLunarYear } from "../bonus";

describe("bonus utils", () => {
  describe("today is not the first day or last day of the lunar year", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      // set 1 to month is mean February
      const date = new Date(2024, 1, 8, 1);
      vi.setSystemTime(date);
      return () => {
        vi.useRealTimers();
      };
    });
    it("it should return false if today is not the first day of the Lunar year", () => {
      const isFirstDay = isTheFirstDayOfLunarYear();
      expect(isFirstDay).toBe(false);
    });

    it("it should return false if today is not the last day of the Lunar year", () => {
      const isFirstDay = isTheLastDayOfLunarYear();
      expect(isFirstDay).toBe(false);
    });
  });

  describe("today is the first day of lunar year", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      // set 1 to month is mean February
      const date = new Date(2024, 1, 10, 1);
      vi.setSystemTime(date);
      return () => {
        vi.useRealTimers();
      };
    });
    it("it should return true if today is the first day of the Lunar year", () => {
      const isFirstDay = isTheFirstDayOfLunarYear();
      expect(isFirstDay).toBe(true);
    });

    it("it should return false if today is not the last day of the Lunar year", () => {
      const isFirstDay = isTheLastDayOfLunarYear();
      expect(isFirstDay).toBe(false);
    });
  });

  describe("today is the last day of lunar year", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      // set 1 to month is mean February
      const date = new Date(2024, 1, 9, 1);
      vi.setSystemTime(date);
      return () => {
        vi.useRealTimers();
      };
    });
    it("it should return false if today is not the first day of the Lunar year", () => {
      const isFirstDay = isTheFirstDayOfLunarYear();
      expect(isFirstDay).toBe(false);
    });

    it("it should return ture if today is the last day of the Lunar year", () => {
      const isFirstDay = isTheLastDayOfLunarYear();
      expect(isFirstDay).toBe(true);
    });
  });
});
