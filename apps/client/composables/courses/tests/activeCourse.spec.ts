import { it, expect, describe, beforeEach } from "vitest";
import { ACTIVE_COURSE_ID, useActiveCourseId } from "../activeCourse";

describe("auto play sound", () => {
  beforeEach(() => {
    localStorage.removeItem(ACTIVE_COURSE_ID);
  });
  it("should be zero if no cache", () => {
    const { activeCourseId } = useActiveCourseId();
    expect(activeCourseId.value).toBe(0);
  });

  it("should be equal to cache value if it exists", () => {
    localStorage.setItem(ACTIVE_COURSE_ID, "10");
    const { activeCourseId } = useActiveCourseId();
    expect(activeCourseId.value).toBe(10);
  });

  it("should be update value", () => {
    const { activeCourseId, updateActiveCourseId } = useActiveCourseId();
    updateActiveCourseId(10);
    expect(activeCourseId.value).toBe(10);
  });

  it("should be reset", () => {
    const { activeCourseId, restActiveCourseId } = useActiveCourseId();
    restActiveCourseId();
    expect(activeCourseId.value).toBe(0);
  });
});
