import { beforeEach, describe, expect, it } from "vitest";

import { useActiveCourseMap } from "../activeCourse";

describe("change active course", () => {
  beforeEach(() => {
    const { resetActiveCourseMap } = useActiveCourseMap();

    resetActiveCourseMap();
  });

  it("should get active course map from localStorage", () => {
    const coursePackId = "1";
    const courseId = "28";
    const { updateActiveCourseMap, activeCourseMap } = useActiveCourseMap();

    updateActiveCourseMap(coursePackId, courseId);

    expect(activeCourseMap.value).toMatchInlineSnapshot(`
      {
        "1": "28",
      }
    `);
  });

  it("should update active course map in localStorage", () => {
    const coursePackId = "1";
    const courseId = "28";

    const { updateActiveCourseMap, activeCourseMap } = useActiveCourseMap();

    updateActiveCourseMap(coursePackId, courseId);
    const updatedCourseId = "29";
    updateActiveCourseMap(coursePackId, updatedCourseId);

    expect(activeCourseMap.value).toMatchInlineSnapshot(`
      {
        "1": "29",
      }
    `);
  });

  it("should delete active course map ", () => {
    const coursePackId = "1";
    const courseId = "28";

    const { updateActiveCourseMap, removeActiveCourseMap, activeCourseMap } = useActiveCourseMap();

    updateActiveCourseMap(coursePackId, courseId);

    removeActiveCourseMap(coursePackId);

    expect(activeCourseMap.value).toMatchInlineSnapshot(`{}`);
  });
});
