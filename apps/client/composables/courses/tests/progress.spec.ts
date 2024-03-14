import { it, expect, describe, beforeEach } from "vitest";
import { COURSE_PROGRESS, useCourseProgress } from "../progress";

describe("course progress", () => {
  beforeEach(() => {
    localStorage.removeItem(COURSE_PROGRESS);
  });
  it("should be zero if no cache", () => {
    const { loadProgress } = useCourseProgress();
    expect(loadProgress(1)).toBe(0);
  });

  it("should be equal to cache value if it exists", () => {
    const mock = { 1: 10 };
    localStorage.setItem(COURSE_PROGRESS, JSON.stringify(mock));
    const { loadProgress } = useCourseProgress();
    expect(loadProgress(1)).toEqual(10);
  });
});
