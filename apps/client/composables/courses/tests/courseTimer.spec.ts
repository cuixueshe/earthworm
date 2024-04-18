// CourseTimer.spec.js
import { beforeEach, describe, expect, it, vi } from "vitest";

import { courseTimer } from "../courseTimer";

describe("course timers", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    courseTimer.reset();
  });

  it("CourseTimer calculates time correctly", async () => {
    courseTimer.time("1");

    vi.advanceTimersByTime(1000);

    courseTimer.timeEnd("1");
    expect(courseTimer.calculateTotalTime()).toBe(1);
  });

  it("should be rounded up", async () => {
    courseTimer.time("1");

    vi.advanceTimersByTime(1600);

    courseTimer.timeEnd("1");
    expect(courseTimer.calculateTotalTime()).toBe(2);
  });

  it("CourseTimer calculates total time correctly with multiple timestamps", async () => {
    courseTimer.time("1");
    vi.advanceTimersByTime(1000);
    courseTimer.timeEnd("1");

    courseTimer.time("2");
    vi.advanceTimersByTime(1000);
    courseTimer.timeEnd("2");

    expect(courseTimer.calculateTotalTime()).toBe(2);
  });

  it("should only take effect on the first call", () => {
    courseTimer.time("1");

    vi.advanceTimersByTime(1000);

    courseTimer.time("1");
    courseTimer.timeEnd("1");

    expect(courseTimer.calculateTotalTime()).toBe(1);
  });

  it("should return record numbers", () => {
    courseTimer.time("1");
    vi.advanceTimersByTime(1000);
    courseTimer.timeEnd("1");

    courseTimer.time("2");
    vi.advanceTimersByTime(1000);
    courseTimer.timeEnd("2");

    expect(courseTimer.totalRecordNumber()).toBe(2);
  });
});
