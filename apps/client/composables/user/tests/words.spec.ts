import { beforeEach, describe, expect, it } from "vitest";

import { SHOW_WORDS_WIDTH, useShowWordsWidth } from "../words";

describe("use words", () => {
  beforeEach(() => {
    const { removeAutoWordsWidth } = useShowWordsWidth();
    removeAutoWordsWidth();
  });

  it("should return true when localStorage is not defined", () => {
    const { isShowWordsWidth } = useShowWordsWidth();

    expect(isShowWordsWidth()).toBeTruthy();
  });

  it("should be equal to cache value if it exists", () => {
    localStorage.setItem(SHOW_WORDS_WIDTH, "false");

    const { isShowWordsWidth } = useShowWordsWidth();

    expect(isShowWordsWidth()).toBeFalsy();
  });

  it("should be toggle value", () => {
    const { isShowWordsWidth, toggleAutoWordsWidth } = useShowWordsWidth();

    expect(isShowWordsWidth()).toBeTruthy();

    toggleAutoWordsWidth();

    expect(isShowWordsWidth()).toBeFalsy();
  });
});
