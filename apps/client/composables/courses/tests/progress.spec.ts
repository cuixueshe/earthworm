import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchCurrentCourseHistory } from "~/api/courseHistory";
import { COURSE_PROGRESS, useCourseProgress } from "../progress";

vi.mock("~/api/courseHistory");

describe("course progress", () => {
  beforeEach(() => {
    localStorage.removeItem(COURSE_PROGRESS);
  });
  it("should be zero if no cache", async () => {
    vi.mocked(fetchCurrentCourseHistory).mockImplementation(() =>
      Promise.resolve({
        courseId: 1,
        completionCount: 0,
        progress: 0,
      })
    );
    const { loadProgress } = useCourseProgress();
    expect(await loadProgress(1)).toBe(0);
  });

  it("should be equal to cache value if it exists", async () => {
    vi.mocked(fetchCurrentCourseHistory).mockImplementation(() =>
      Promise.resolve({
        courseId: 1,
        completionCount: 0,
        progress: 10,
      })
    );
    const { loadProgress } = useCourseProgress();
    expect(await loadProgress(1)).toEqual(10);
  });
});
