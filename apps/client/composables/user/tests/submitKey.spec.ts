import { beforeEach, describe, expect, it } from "vitest";

import { SPACE_SUBMIT_ANSWER, useSpaceSubmitAnswer } from "../submitKey";

describe("submit shortcut", () => {
  beforeEach(() => {
    const { removeUseSpaceSubmitAnswer } = useSpaceSubmitAnswer();
    removeUseSpaceSubmitAnswer();
  });

  it("should be false if no cache", () => {
    const { isUseSpaceSubmitAnswer } = useSpaceSubmitAnswer();

    expect(isUseSpaceSubmitAnswer()).toBe(false);
  });

  it("should be equal to cache value if it exists", () => {
    localStorage.setItem(SPACE_SUBMIT_ANSWER, "true");

    const { isUseSpaceSubmitAnswer } = useSpaceSubmitAnswer();

    expect(isUseSpaceSubmitAnswer()).toBe(true);
  });

  it("should be toggle value", () => {
    const { isUseSpaceSubmitAnswer, toggleUseSpaceSubmitAnswer } = useSpaceSubmitAnswer();

    expect(isUseSpaceSubmitAnswer()).toBe(false);

    toggleUseSpaceSubmitAnswer();

    expect(isUseSpaceSubmitAnswer()).toBe(true);
  });
});
