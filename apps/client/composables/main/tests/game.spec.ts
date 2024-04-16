import { describe, expect, it } from "vitest";

import { useGameMode } from "../game";

describe("Game Mode Composable", () => {
  it("changes game mode to Answer", () => {
    const { showAnswer, isAnswer } = useGameMode();

    showAnswer();

    expect(isAnswer()).toBe(true);
  });

  it("changes game mode back to Question", () => {
    const { showAnswer, showQuestion, isQuestion } = useGameMode();
    showAnswer();

    showQuestion();

    expect(isQuestion()).toBe(true);
  });

  it("confirms isAnswer returns true only when game mode is Answer", () => {
    const { showAnswer, isAnswer, isQuestion } = useGameMode();
    showAnswer();

    expect(isAnswer()).toBe(true);
    expect(isQuestion()).toBe(false);
  });

  it("confirms isQuestion returns true only when game mode is Question", () => {
    const { showQuestion, isQuestion, isAnswer } = useGameMode();
    showQuestion();

    expect(isQuestion()).toBe(true);
    expect(isAnswer()).toBe(false);
  });
});
