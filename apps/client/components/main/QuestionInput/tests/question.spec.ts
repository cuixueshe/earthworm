import { describe, expect, it } from "vitest";

import { getWordWidth } from "../questionInputHelper";

describe("getWordWidth", () => {
  it("should return the correct width for a single letter", () => {
    expect(getWordWidth("i")).toBe(1.5); // 0.5 (width of 'i') + 1 (padding)
    expect(getWordWidth("w")).toBe(2.5); // 1.5 (width of 'w') + 1 (padding)
  });

  it("should return the correct width for a word", () => {
    expect(getWordWidth("hi")).toBe(2.6); // 1.1 (width of 'h') + 0.5 (width of 'i') + 1 (padding)
    expect(getWordWidth("wow")).toBe(5.1); // 1.5 (width of 'w') * 2 + 1.1 (width of 'o') + 1 (padding)
  });

  it("should handle uppercase letters", () => {
    expect(getWordWidth("I")).toBe(1.5); // 0.5 (width of 'I') + 1 (padding)
    expect(getWordWidth("WOW")).toBe(5.1); // 1.5 (width of 'W') * 2 + 1.1 (width of 'O') + 1 (padding)
  });

  it("should handle non-letter characters", () => {
    expect(getWordWidth("123")).toBe(4); // 1 (width of each character) * 3 + 1 (padding)
    expect(getWordWidth("!@#")).toBe(4); // 1 (width of each character) * 3 + 1 (padding)
  });

  it("should return the correct width for a long string with various characters", () => {
    const longString =
      "This is a long string with various characters, including letters, numbers, and symbols! 1234567890";
    expect(getWordWidth(longString)).toBe(91.3);
  });
});
