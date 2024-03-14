import { it, expect, describe, beforeEach } from "vitest";
import { USE_SPACE_SUBMIT_ANSWER, useSpaceSubmitAnswer } from "../submitKey";

describe("submit shortcut", () => {
  beforeEach(() => {
    localStorage.removeItem(USE_SPACE_SUBMIT_ANSWER);
  });
  it("should be false if no cache", () => {
    const { useSpace } = useSpaceSubmitAnswer();
    expect(useSpace.value).toBe(false);
  });

  it("should be equal to cache value if it exists", () => {
    localStorage.setItem(USE_SPACE_SUBMIT_ANSWER, "false");
    const { useSpace } = useSpaceSubmitAnswer();
    expect(useSpace.value).toBe(false);
  });

  it("should be toggle value", () => {
    const { useSpace, toggleUseSpaceSubmitAnswer } = useSpaceSubmitAnswer();
    useSpace.value = false;
    toggleUseSpaceSubmitAnswer();
    expect(useSpace.value).toBe(true);
  });
});
