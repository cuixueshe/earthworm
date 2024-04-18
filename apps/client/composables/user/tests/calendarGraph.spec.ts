import { describe, expect, it, vi } from "vitest";

import type { EmitsType } from "../calendarGraph";
import { useCalendarGraph } from "../calendarGraph";

describe("use calendar graph", () => {
  const emits: EmitsType = vi.fn();
  const {
    format,
    getOrdinalSuffix,
    getActivityLevel,
    calcStartDate,
    calcDateRange,
    initTable,
    initTbody,
    initData,
    renderHead,
    renderBody,
  } = useCalendarGraph(emits);

  it("should return the formatted date", () => {
    const date = format(new Date("2024-01-01"));

    expect(date).toBe("2024-01-01");
  });

  it.each([
    [1, "st"],
    [2, "nd"],
    [3, "rd"],
    [4, "th"],
    [11, "th"],
    [12, "th"],
    [13, "th"],
    [21, "st"],
    [22, "nd"],
    [23, "rd"],
    [31, "st"],
  ])("%s should return the suffix %s", (day, expected) => {
    expect(getOrdinalSuffix(day)).toBe(expected);
  });

  it.each([
    [1, "low"],
    [3, "moderate"],
    [5, "high"],
    [10, "higher"],
  ])("%s should return the activity level %s", (day, expected) => {
    expect(getActivityLevel(day)).toBe(expected);
  });

  it("should return the start date for graph", () => {
    const date = calcStartDate(new Date("2024-03-11"));

    expect(format(date)).toBe("2023-03-12");
  });

  it("should return the date range for 2024", () => {
    const { startDate, endDate } = calcDateRange(2024);

    expect(format(startDate)).toBe("2024-01-01");
    expect(format(endDate)).toBe("2024-12-31");
  });

  it("should return the date range for today to last year", () => {
    const start = calcStartDate(new Date());
    const end = new Date();

    const { startDate, endDate } = calcDateRange();

    expect(format(startDate)).toBe(format(start));
    expect(format(endDate)).toBe(format(end));
  });

  it("should return initialized table body data", () => {
    const sundayStart = initTbody(new Date("2023-01-01")); // sunday
    const wednesdayStart = initTbody(new Date("2020-01-01")); // wednesday

    expect(sundayStart).toEqual([[], [], [], [], [], [], []]);
    expect(wednesdayStart).toEqual([[null], [null], [null], [], [], [], []]);
  });

  it("should return initialized table data", () => {
    const { thead, tbody } = initData(2024);

    expect(thead).toEqual([
      { offset: 0, month: 0 },
      { offset: 5, month: 1 },
      { offset: 9, month: 2 },
      { offset: 14, month: 3 },
      { offset: 18, month: 4 },
      { offset: 22, month: 5 },
      { offset: 27, month: 6 },
      { offset: 31, month: 7 },
      { offset: 35, month: 8 },
      { offset: 40, month: 9 },
      { offset: 44, month: 10 },
      { offset: 48, month: 11 },
    ]);
    expect(tbody[0].length).toBe(53);
    expect(format(tbody[1][0]!.date)).toBe("2024-01-01");
  });

  it("should initial table", () => {
    //
    initTable(2024);

    expect(emits).toHaveBeenCalledWith("toggleYear", 2024);
  });

  it("should return render table header data", () => {
    const { thead } = initData(2024);

    const data = renderHead(thead);

    expect(data).toEqual([
      { colSpan: 5, month: "Jan" },
      { colSpan: 4, month: "Feb" },
      { colSpan: 5, month: "Mar" },
      { colSpan: 4, month: "Apr" },
      { colSpan: 4, month: "May" },
      { colSpan: 5, month: "Jun" },
      { colSpan: 4, month: "Jul" },
      { colSpan: 4, month: "Aug" },
      { colSpan: 5, month: "Sep" },
      { colSpan: 4, month: "Oct" },
      { colSpan: 4, month: "Nov" },
      { colSpan: 5, month: "Dec" },
    ]);
  });

  it("should return render table body data", () => {
    initTable(2024);
    const apiData = [
      { date: "2024-01-01", count: 1 },
      { date: "2024-01-02", count: 3 },
      { date: "2024-01-03", count: 5 },
      { date: "2024-01-04", count: 10 },
    ];

    const tbody = renderBody(apiData);

    expect(tbody[1][0]?.tips).toBe("1 contributions on January 1st, 2024");
    expect(tbody[1][0]?.bg).toBe("low");
    expect(tbody[2][0]?.tips).toBe("3 contributions on January 2nd, 2024");
    expect(tbody[2][0]?.bg).toBe("moderate");
    expect(tbody[3][0]?.tips).toBe("5 contributions on January 3rd, 2024");
    expect(tbody[3][0]?.bg).toBe("high");
    expect(tbody[4][0]?.tips).toBe("10 contributions on January 4th, 2024");
    expect(tbody[4][0]?.bg).toBe("higher");
  });
});
