import { describe, expect, it } from "vitest";

import { useAnswerTip } from "../answerTip";

describe("answer tip", () => {
  it("show answer tip modal", () => {
    const { showAnswerTip, isAnswerTip } = useAnswerTip();
    showAnswerTip();
    expect(isAnswerTip()).toBe(true);
  });

  it("hidden answer tip modal", () => {
    const { hiddenAnswerTip, isAnswerTip } = useAnswerTip();
    hiddenAnswerTip();
    expect(isAnswerTip()).toBe(false);
  });
});
