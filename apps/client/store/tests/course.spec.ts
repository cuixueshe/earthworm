import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";

import { fetchCompleteCourse, fetchCourse } from "~/api/course";
import { fetchAddMasteredElement, fetchGetMasteredElements } from "~/api/mastered-elements";
import { useActiveCourseMap } from "~/composables/courses/activeCourse";
import { isAuthenticated } from "~/services/auth";
import { useMasteredElementsStore } from "~/store/masteredElements";
import { useCourseStore } from "../course";
import { useStatement } from "../statement";

vi.mock("~/api/course");
vi.mock("~/api/mastered-elements");
vi.mock("~/services/auth");
vi.mock("~/composables/courses/activeCourse");

let mockSetupAutoSaveProgress = vi.fn();
vi.mock("../statement.ts", () => {
  return {
    useStatement: () => {
      const returnObj = {
        setupAutoSaveProgress: mockSetupAutoSaveProgress,
        statementIndex: ref(0),
      };

      return returnObj;
    },
  };
});

const mockCourse = {
  id: "1",
  title: "Test Course",
  description: "A test course",
  order: 1,
  statements: [
    {
      id: "1",
      order: 1,
      english: "Hello",
      chinese: "你好",
      soundmark: "/heləʊ/",
      isMastered: false,
    },
    {
      id: "2",
      order: 2,
      english: "World",
      chinese: "世界",
      soundmark: "/wɜːld/",
      isMastered: false,
    },
    { id: "3", order: 3, english: "Test", chinese: "测试", soundmark: "/test/", isMastered: false },
    {
      id: "4",
      order: 4,
      english: "Unit",
      chinese: "单元",
      soundmark: "/ˈjuːnɪt/",
      isMastered: false,
    },
    { id: "5", order: 5, english: "Case", chinese: "案例", soundmark: "/keɪs/", isMastered: false },
  ],
  coursePackId: "pack1",
  completionCount: 0,
  statementIndex: 0,
  video: "https://example.com/test-video.mp4",
};

describe("CourseStore", () => {
  let courseStore: ReturnType<typeof useCourseStore>;
  let masteredElementsStore: ReturnType<typeof useMasteredElementsStore>;

  beforeEach(async () => {
    setActivePinia(createPinia());
    vi.mocked(fetchCourse).mockResolvedValue(mockCourse);
    vi.mocked(isAuthenticated).mockReturnValue(true);
    vi.mocked(useActiveCourseMap).mockReturnValue({
      updateActiveCourseMap: vi.fn(),
    } as any);

    vi.mocked(fetchGetMasteredElements).mockResolvedValue([
      { content: { english: "World" }, masteredAt: new Date().toISOString(), id: "1" },
    ]);

    vi.mocked(fetchAddMasteredElement).mockImplementation((content) =>
      Promise.resolve({
        content,
        masteredAt: new Date().toISOString(),
        id: String(Math.random()),
      }),
    );

    masteredElementsStore = useMasteredElementsStore();
    await masteredElementsStore.setup();

    courseStore = useCourseStore();
    await courseStore.setup("pack1", "1");

    vi.clearAllMocks();
  });

  describe("Course initialization", () => {
    it("should correctly load the course and mark mastered elements", () => {
      expect(courseStore.currentCourse).toEqual(mockCourse);
      expect(courseStore.currentCourse?.statements[1].isMastered).toBe(true); // World
      expect(courseStore.currentCourse?.statements[0].isMastered).toBe(false); // Hello
    });

    it("should set up auto-save progress when user is authenticated", async () => {
      await courseStore.setup("pack1", "1");
      expect(mockSetupAutoSaveProgress).toHaveBeenCalled();
    });

    it("should not set up auto-save progress when user is not authenticated", async () => {
      vi.mocked(isAuthenticated).mockReturnValue(false);
      await courseStore.setup("pack1", "1");
      expect(mockSetupAutoSaveProgress).not.toHaveBeenCalled();
    });
  });

  describe("Statement navigation", () => {
    it("should navigate to the next unmastered statement", () => {
      courseStore.toNextStatement();
      expect(courseStore.statementIndex).toBe(2); // Skips "World" as it's mastered
    });

    it("should navigate to the previous unmastered statement", () => {
      courseStore.toSpecificStatement(2);
      courseStore.toPreviousStatement();
      expect(courseStore.statementIndex).toBe(0); // Skips "World" as it's mastered
    });

    it("should handle navigation boundaries", () => {
      courseStore.toPreviousStatement();
      expect(courseStore.statementIndex).toBe(0);
      for (let i = 0; i < 10; i++) courseStore.toNextStatement();
      expect(courseStore.statementIndex).toBe(4);
    });
  });

  describe("Progress tracking", () => {
    it("should correctly identify when all statements are done", () => {
      expect(courseStore.isAllDone()).toBe(false);
      courseStore.toSpecificStatement(4);
      expect(courseStore.isAllDone()).toBe(true);
    });

    it("should correctly identify the last statement", () => {
      expect(courseStore.isLastStatement()).toBe(false);
      courseStore.toSpecificStatement(4);
      expect(courseStore.isLastStatement()).toBe(true);
    });

    it("should correctly identify when all statements are mastered", async () => {
      expect(courseStore.isAllMastered()).toBe(false);
      vi.mocked(fetchGetMasteredElements).mockResolvedValue(
        mockCourse.statements.map((s, index) => ({
          content: { english: s.english },
          masteredAt: new Date().toISOString(),
          id: String(index),
        })),
      );
      await masteredElementsStore.setup();
      courseStore.updateMarketedStatements();
      expect(courseStore.isAllMastered()).toBe(true);
    });
  });

  describe("Visible statements and index relationship", () => {
    it("should correctly calculate the number of visible statements", () => {
      expect(courseStore.visibleStatementsCount).toBe(4); // All except "World"
    });

    it("should have correct initial visibleStatementIndex", () => {
      expect(courseStore.visibleStatementIndex).toBe(0);
    });

    it("should update visibleStatementIndex when navigating to next statement", () => {
      courseStore.toNextStatement();
      expect(courseStore.visibleStatementIndex).toBe(1);
    });

    it("should update visibleStatementIndex when navigating to previous statement", () => {
      courseStore.toSpecificStatement(3);
      courseStore.toPreviousStatement();
      expect(courseStore.visibleStatementIndex).toBe(1);
    });

    it("should update visibleStatementIndex when jumping to a specific index", () => {
      courseStore.toSpecificStatement(3);
      expect(courseStore.visibleStatementIndex).toBe(2);
    });

    it("should reset visibleStatementIndex on doAgain", () => {
      courseStore.toSpecificStatement(3);
      courseStore.doAgain();
      expect(courseStore.visibleStatementIndex).toBe(0);
    });

    it("should update visibleStatementIndex when adding a new mastered element", async () => {
      await masteredElementsStore.addElement({ english: "Hello" });
      courseStore.updateMarketedStatements();
      courseStore.toNextStatement();
      expect(courseStore.visibleStatementIndex).toBe(0);
      expect(courseStore.statementIndex).toBe(2); // Now points to "Test"
    });

    it("should handle visibleStatementIndex when all statements are mastered", async () => {
      vi.mocked(fetchGetMasteredElements).mockResolvedValue(
        mockCourse.statements.map((s, index) => ({
          content: { english: s.english },
          masteredAt: new Date().toISOString(),
          id: String(index),
        })),
      );
      await masteredElementsStore.setup();
      courseStore.updateMarketedStatements();
      expect(courseStore.visibleStatementIndex).toBe(-1);
      expect(courseStore.visibleStatementsCount).toBe(0);
    });
  });

  describe("Course reset and completion", () => {
    it("should reset course state on doAgain", () => {
      courseStore.toSpecificStatement(3);
      courseStore.doAgain();
      expect(courseStore.statementIndex).toBe(0);
      expect(courseStore.visibleStatementIndex).toBe(0);
    });

    it("should complete the course and fetch the next course", async () => {
      vi.mocked(fetchCompleteCourse).mockResolvedValue({ nextCourse: { ...mockCourse, id: "2" } });
      const result = await courseStore.completeCourse();
      expect(result).toEqual({ nextCourse: { ...mockCourse, id: "2" } });
    });
  });

  describe("Computed properties", () => {
    it("should return the correct current statement", () => {
      expect(courseStore.currentStatement).toEqual(mockCourse.statements[0]);
    });

    it("should correctly split the current statement's English words", () => {
      expect(courseStore.words).toEqual(["Hello"]);
    });

    it("should return the correct total number of questions", () => {
      expect(courseStore.totalQuestionsCount).toBe(5);
    });
  });

  describe("Edge cases", () => {
    it("should handle an empty course", async () => {
      vi.mocked(fetchCourse).mockResolvedValue({ ...mockCourse, statements: [] });
      await courseStore.setup("pack1", "1");
      expect(courseStore.visibleStatementsCount).toBe(0);
      expect(courseStore.isAllDone()).toBe(true);
      expect(courseStore.isAllMastered()).toBe(true);
    });

    it("should handle a course with only one statement", async () => {
      vi.mocked(fetchCourse).mockResolvedValue({
        ...mockCourse,
        statements: [mockCourse.statements[0]],
      });
      await courseStore.setup("pack1", "1");
      expect(courseStore.totalQuestionsCount).toBe(1);
      expect(courseStore.isLastStatement()).toBe(true);
    });
  });
});
