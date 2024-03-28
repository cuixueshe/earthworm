import { beforeEach, describe, expect, it } from "vitest";
import { LISTENING_MODE, useAnswerMode } from "../answerMode";

describe("switch answer mode", () => {
  beforeEach(() => {
    localStorage.removeItem(LISTENING_MODE);
  });
  it("should be false if no cache", () => {
    const { listeningMode } = useAnswerMode();
    expect(listeningMode.value).toBe(false);
  });

  it("should be equal to cache value if it exists", () => {
    localStorage.setItem(LISTENING_MODE, "false");
    const { listeningMode } = useAnswerMode();
    expect(listeningMode.value).toBe(false);
  });

  it("should be toggle value", () => {
    const { listeningMode, toggleMode } = useAnswerMode();
    listeningMode.value = false;
    toggleMode();
    expect(listeningMode.value).toBe(true);
  });
});
