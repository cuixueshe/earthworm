import { it, expect, describe, beforeEach } from "vitest";
import { COURSE_PROGRESS } from "~/store/course";
import { useCourseProgress } from "../progress";

describe("course progress", () => {
  beforeEach(() => {
    localStorage.removeItem(COURSE_PROGRESS);
  });
  it("should be undefined if no cache", () => {
    const { loadProgress } = useCourseProgress();
    expect(loadProgress()).toBe(undefined);
  });

  it("should be equal to cache value if it exists", () => {
    const mock = {
      1: {
        index: 0,
        total: 10,
      },
    };
    localStorage.setItem(COURSE_PROGRESS, JSON.stringify(mock));
    const { loadProgress } = useCourseProgress();
    expect(loadProgress()).toEqual(mock);
  });
});
