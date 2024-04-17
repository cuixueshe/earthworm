import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { formatSecondsToTime, formatTimestamp, getToday, isTheDay } from "../date";

const dummyDay = {
  year: 2024,
  month: 1,
  day: 1,
};

describe("date util", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    const date = new Date(dummyDay.year, dummyDay.month - 1, dummyDay.day, 0);
    vi.setSystemTime(date);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be the specify date", () => {
    const isTheSpecifyDate = isTheDay(dummyDay);
    expect(isTheSpecifyDate).toBe(true);
  });

  it("should get the current date", () => {
    const today = getToday();
    expect(today).toEqual(dummyDay);
  });

  // 新增测试用例
  it("should format timestamp correctly", () => {
    const timestamp = new Date(2024, 0, 1, 15, 30).getTime(); // 15:30 PM
    const formatted = formatTimestamp({ timestamp });
    expect(formatted).toBe("3:30 PM · Jan 1, 2024");
  });

  // 测试边界值（例如年末和年初）
  it("should correctly handle the end of the year", () => {
    vi.setSystemTime(new Date(2023, 11, 31, 23, 59)); // 12月31日
    const newYearDay = { year: 2024, month: 1, day: 1 };
    expect(isTheDay(newYearDay)).toBe(false); // 应该返回false，因为还没到新年
  });

  // 测试上午时间格式化
  it("should format morning timestamp correctly", () => {
    const morningTimestamp = new Date(2024, 0, 1, 9, 15).getTime(); // 9:15 AM
    const formattedMorning = formatTimestamp({ timestamp: morningTimestamp });
    expect(formattedMorning).toBe("9:15 AM · Jan 1, 2024");
  });

  // 测试下午时间格式化
  it("should format afternoon timestamp correctly", () => {
    const afternoonTimestamp = new Date(2024, 0, 1, 16, 45).getTime(); // 4:45 PM
    const formattedAfternoon = formatTimestamp({
      timestamp: afternoonTimestamp,
    });
    expect(formattedAfternoon).toBe("4:45 PM · Jan 1, 2024");
  });
});

describe("formatSecondsToTime", () => {
  it("formats seconds correctly", () => {
    expect(formatSecondsToTime(45)).toBe("45秒");
  });

  it("formats minutes correctly", () => {
    expect(formatSecondsToTime(600)).toBe("10分");
  });

  it("formats minutes and seconds correctly", () => {
    expect(formatSecondsToTime(605)).toBe("10分5秒");
  });

  it("formats hours correctly", () => {
    expect(formatSecondsToTime(3600)).toBe("1时");
  });

  it("formats hours, minutes, and seconds correctly", () => {
    expect(formatSecondsToTime(3661)).toBe("1时1分1秒");
  });

  it("formats 0 seconds correctly", () => {
    expect(formatSecondsToTime(0)).toBe("0秒");
  });
});
