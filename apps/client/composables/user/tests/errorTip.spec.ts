import { beforeEach, describe, expect, it } from "vitest";

import { SHOW_ERROR_TIP, useErrorTip } from "../errorTip";

describe("use errorTip", () => {
  beforeEach(() => {
    const { removeShowErrorTip } = useErrorTip();
    removeShowErrorTip();
  });

  it("should return true when localStorage is not defined", () => {
    const { isShowErrorTip } = useErrorTip();
    expect(isShowErrorTip()).toBeTruthy();
  });

  it("should be equal to cache value if it exists", () => {
    localStorage.setItem(SHOW_ERROR_TIP, "showErrorTip");
    const { isShowErrorTip } = useErrorTip();
    expect(isShowErrorTip()).toBeFalsy();
  });

  it("should be toggle value", () => {
    const { isShowErrorTip, toggleShowErrorTip } = useErrorTip();
    expect(isShowErrorTip()).toBeTruthy();
    toggleShowErrorTip();
    expect(isShowErrorTip()).toBeFalsy();
  });
});
