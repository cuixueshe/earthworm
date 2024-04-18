import { beforeEach, describe, expect, it } from "vitest";

import { AUTO_NEXT_QUESTION, useAutoNextQuestion } from "../autoNext";

describe("use auto next question", () => {
  beforeEach(() => {
    const { removeAutoQuestion } = useAutoNextQuestion();
    removeAutoQuestion();
  });

  it("should return true when localStorage is not defined", () => {
    const { isAutoNextQuestion } = useAutoNextQuestion();

    expect(isAutoNextQuestion()).toBeFalsy();
  });

  it("should be equal to cache value if it exists", () => {
    localStorage.setItem(AUTO_NEXT_QUESTION, "true");

    const { isAutoNextQuestion } = useAutoNextQuestion();

    expect(isAutoNextQuestion()).toBeTruthy();
  });

  it("should be toggle value", () => {
    const { isAutoNextQuestion, toggleAutoQuestion } = useAutoNextQuestion();

    expect(isAutoNextQuestion()).toBeFalsy();

    toggleAutoQuestion();

    expect(isAutoNextQuestion()).toBeTruthy();
  });
});
