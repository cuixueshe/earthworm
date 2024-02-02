import { it, expect, describe, beforeEach } from "vitest";
import { getToken, cleanToken, checkHaveToken, setToken } from "../token";

describe("token", () => {
  beforeEach(() => {
    cleanToken();
  });

  it("should set and get a token", () => {
    const token = "123456";
    setToken(token);
    expect(getToken()).toBe(token);
  });

  it("should check if token exists", () => {
    expect(checkHaveToken()).toBe(null);
    setToken("123456");
    expect(checkHaveToken()).toBe("123456");
  });

  it("should clean the token", () => {
    setToken("123456");
    expect(getToken()).toBe("123456");
    cleanToken();
    expect(getToken()).toBe(null);
  });
});
