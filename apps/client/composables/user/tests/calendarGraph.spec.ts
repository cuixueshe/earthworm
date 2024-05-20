import { describe, expect, it } from "vitest";

import { useCalendarGraph } from "../calendarGraph";

describe("use calendar graph", () => {
  const { reRender, renderData, renderLegends, renderMonthLabels, renderTips, renderWeekLabels } =
    useCalendarGraph();

  function checkRenderData(date: string, count: number) {
    const item = renderData.value.find((item) => item.date === date);
    return count === item?.count;
  }

  it("should get calendar render data", () => {
    const apiData = [
      { day: "2024-01-01", count: 1 },
      { day: "2024-01-02", count: 3 },
      { day: "2024-01-03", count: 5 },
      { day: "2024-01-04", count: 10 },
    ];

    reRender({ data: apiData });

    apiData.forEach((item) => {
      expect(checkRenderData(item.day, item.count)).true;
    });
  });
});
