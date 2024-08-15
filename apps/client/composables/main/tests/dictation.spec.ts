import { describe, expect, it } from "vitest";

import { defaultOptions, useToolbar } from "../dictation";

describe("dictation", () => {
  it("should save toolbar data and recover toolbar data", () => {
    const { saveToolBarData, toolBarData, recoverToolBarData } = useToolbar();

    toolBarData.times = 2;
    toolBarData.rate = 2;
    toolBarData.interval = 3000;

    saveToolBarData();

    recoverToolBarData();

    expect(toolBarData).toEqual({
      times: 2,
      rate: 2,
      interval: 3000,
    });
  });

  it("should reset toolbar data", () => {
    const { toolBarData, resetToolBarData } = useToolbar();

    toolBarData.times = 2;
    toolBarData.rate = 2;
    toolBarData.interval = 3000;

    resetToolBarData();

    expect(toolBarData).toEqual(defaultOptions);
  });
});
