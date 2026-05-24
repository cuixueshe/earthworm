import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Course, CoursePack } from "~/types";
import { fetchCourseHistory } from "~/api/course-history";
import { fetchCoursePack } from "~/api/course-pack";
import { useCoursePackStore } from "../coursePack";

vi.mock("~/api/course-pack");
vi.mock("~/api/course-history");

describe("course pack store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should ", async () => {
    const coursePack: CoursePack = {
      id: "coursePackId",
      title: "Gói bài học 1",
      description: "Đây là một gói bài học",
      isFree: true,
      courses: [],
      cover: "",
    };

    const firstCourse: Course = {
      id: "1",
      title: "Bài học 1",
      description: "",
      video: "",
      order: 1,
      coursePackId: coursePack.id,
      completionCount: 0,
      statementIndex: 0,
      statements: [
        {
          id: "1",
          order: 1,
          english: "I",
          nativeText: "Tôi",
          soundmark: "/aɪ/",
          isMastered: false,
        },
        {
          id: "2",
          order: 2,
          english: "like",
          nativeText: "thích",
          soundmark: "/laɪk/",
          isMastered: false,
        },
      ],
    };

    const secondCourse: Course = {
      id: "2",
      title: "Bài học 2",
      order: 2,
      description: "",
      video: "",
      coursePackId: coursePack.id,
      completionCount: 0,
      statementIndex: 0,
      statements: [
        {
          id: "1",
          order: 1,
          english: "I",
          nativeText: "Tôi",
          soundmark: "/aɪ/",
          isMastered: false,
        },
        {
          id: "2",
          order: 2,
          english: "like",
          nativeText: "thích",
          soundmark: "/laɪk/",
          isMastered: false,
        },
      ],
    };

    coursePack.courses = [firstCourse, secondCourse];

    vi.mocked(fetchCoursePack).mockImplementation(async () => coursePack);

    vi.mocked(fetchCourseHistory).mockImplementation(async () => {
      return [
        {
          id: 1,
          completionCount: 5,
          courseId: firstCourse.id,
          coursePackId: coursePack.id,
        },
      ];
    });

    const coursePackStore = useCoursePackStore();

    await coursePackStore.setupCoursePack(coursePack.id);

    await coursePackStore.updateCoursesCompleteCount(coursePack.id);

    expect(coursePackStore.currentCoursePack?.courses[0].completionCount).toBe(5);
    expect(coursePackStore.currentCoursePack?.courses[1].completionCount).toBe(0);
  });
});
