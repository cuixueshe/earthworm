import { vi, it, expect, describe } from "vitest";
import { isProd, isDev } from "../env";


describe("env", () => {
  it("should be production env", () => {
    vi.stubEnv("NODE_ENV", "production");

    expect(isProd()).toBe(true);
  });

  it("should be development env", () => {
    vi.stubEnv("NODE_ENV", "development");

    expect(isDev()).toBe(true);
  });
});
