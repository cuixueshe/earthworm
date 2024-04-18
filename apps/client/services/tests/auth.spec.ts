import { useLogto } from "@logto/vue";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { getSignInCallback, setupAuth, signIn } from "../auth";

import "../auth";

vi.mock("@logto/vue");

vi.mocked(useLogto).mockImplementation(() => {
  return {
    signIn: vi.fn(),
  } as any;
});

describe("auth", () => {
  beforeAll(() => {
    setupAuth();
  });

  it("should get signIn callback and consume callback", () => {
    signIn("/main/1");

    const callback = getSignInCallback();

    expect(callback).toBe("/main/1");

    const callback2 = getSignInCallback();
    expect(callback2).toBe("/");
  });

  it("should get default callback", () => {
    signIn();

    const callback = getSignInCallback();

    expect(callback).toBe("/");
  });
});
