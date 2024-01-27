import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useCourseStore } from "../course";
import { fetchCourse, fetchNextCourse } from "~/api/course";
import { type Course } from "../course";

vi.mock("~/api/course");

const firstCourse: Course = {
  id: 1,
  title: "第一课",
  statements: [
    { id: 1, english: "I", chinese: "我", soundmark: "/aɪ/" },
    {
      id: 2,
      chinese: "喜欢",
      english: "like",
      soundmark: "/laɪk/",
    },
  ],
};

const secondCourse: Course = {
  id: 2,
  title: "第二课",
  statements: [
    { id: 1, english: "like", chinese: "喜欢", soundmark: "/laɪk/" },
  ],
};

vi.mocked(fetchCourse).mockImplementation(async () => firstCourse);
vi.mocked(fetchNextCourse).mockImplementation(async () => secondCourse);

describe("course", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initializes with a course", async () => {
    const store = useCourseStore();

    await store.setup(1);

    expect(store.currentCourse).toEqual(firstCourse);
    expect(store.statementIndex).toBe(0);
  });

  it("goes to the next course", async () => {
    const store = useCourseStore();

    const result = await store.goToNextCourse(1);

    expect(result).toBe(true);
    expect(store.currentCourse).toEqual(secondCourse);
    expect(store.statementIndex).toBe(0);
  });

  it("navigates to the next statement", async () => {
    const store = useCourseStore();
    await store.setup(1);

    store.toNextStatement();

    expect(store.statementIndex).toBe(1);
  });

  it("resets statementIndex on doAgain", async () => {
    const store = useCourseStore();
    await store.setup(1);
    store.toNextStatement();

    store.doAgain();

    expect(store.statementIndex).toBe(0);
  });

  it("checks if all statements are done", async () => {
    const store = useCourseStore();
    await store.setup(1);

    expect(store.isAllDone()).toBe(false);
    //在 firstCourse 中只有 2 个 statement
    //所以执行后 就应该是完成的状态
    store.toNextStatement();
    expect(store.isAllDone()).toBe(true);
  });

  it("checks if the answer is correct", async () => {
    const store = useCourseStore();
    await store.setup(firstCourse.id);

    expect(store.checkCorrect("I")).toBe(true);
    expect(store.checkCorrect("i")).toBe(true);
    expect(store.checkCorrect("like")).toBe(false);
  });

  it("the length of the word should be one", async () => {
    const store = useCourseStore();
    await store.setup(firstCourse.id);

    expect(store.wordCount).toBe(1);
  });

  it("the count of first course question should be two", async () => {
    const store = useCourseStore();
    await store.setup(firstCourse.id);

    expect(store.totalQuestionsCount).toBe(2);
  });
});
