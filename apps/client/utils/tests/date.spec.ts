import { it, expect, describe, vi, beforeEach } from "vitest";
import { getToday, isTheDay } from "../date";

const dummyDay = {
  year: 2024,
  month: 1,
  day: 1,
}

describe("date util", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // set 0 to month is mean January
    const date = new Date(dummyDay.year, dummyDay.month - 1 , dummyDay.day, 0);
    vi.setSystemTime(date);
    return () => {
      vi.useRealTimers();
    };
  });

  it("should be the specify date", () => {
    const isTheSpecifyDate = isTheDay(dummyDay);
    expect(isTheSpecifyDate).toBe(true)
  });

  it("should get the current date", () => {
    const today = getToday()
    expect(today).toEqual(dummyDay)
  });
});
