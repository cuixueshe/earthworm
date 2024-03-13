import { it, expect, describe, beforeEach } from "vitest";
import { numberToChinese } from "../utils";

describe("utils", () => {
  it("number to chinese", () => {
    expect(numberToChinese(17)).toBe("十七");
    expect(numberToChinese(53)).toBe("五十三");
    expect(numberToChinese(143)).toBe("一百四十三");
  });
});
