import { beforeEach, describe, expect, it, vi } from "vitest";

import { normalEffect, redFireworksEffect, schoolPrideEffect } from "../confettiEffect";
import { useConfetti } from "../useConfetti";

vi.mock("../confettiEffect", () => {
  return {
    redFireworksEffect: vi.fn(),
    normalEffect: vi.fn(),
    schoolPrideEffect: vi.fn(),
  };
});

const setupCurrentDay = ([year, month, day]: [number, number, number]) => {
  // set 1 to month is mean February
  const date = new Date(year, month, day, 1);
  vi.setSystemTime(date);
};

const setupNormalDay = () => setupCurrentDay([2024, 1, 8]);
const setupLastDayOfLunarYear = () => setupCurrentDay([2024, 1, 9]);
const setupFirstDayOfLunarYear = () => setupCurrentDay([2024, 1, 10]);

describe("confetti", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    return () => {
      vi.useRealTimers();
    };
  });

  it("should play the normal confetti in normal day", () => {
    setupNormalDay();
    const { playConfetti } = useConfetti();
    playConfetti();
    expect(normalEffect).toBeCalled();
  });

  it("should play the special confetti for the first day of lunar year", () => {
    setupFirstDayOfLunarYear();
    const { playConfetti } = useConfetti();
    playConfetti();
    expect(redFireworksEffect).toBeCalled();
  });

  it("should play the special confetti for the last day of lunar year", () => {
    setupLastDayOfLunarYear();
    const { playConfetti } = useConfetti();
    playConfetti();
    expect(schoolPrideEffect).toBeCalled();
  });
});
