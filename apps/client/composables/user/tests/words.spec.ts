import { describe, it, expect } from "vitest";
import { useShowWordsWidth } from "../words";

describe("use words", () => {
  it("should return true when localStorage is not defined", () => {
    const { isShowWordsWidth } = useShowWordsWidth();

    expect(isShowWordsWidth()).toBeTruthy();
  });

  it("should return false when toggle the handle", () => {
    const { isShowWordsWidth, toggleAutoWordsWidth } = useShowWordsWidth();

    toggleAutoWordsWidth();

    expect(isShowWordsWidth()).toBeFalsy();
  });
});
