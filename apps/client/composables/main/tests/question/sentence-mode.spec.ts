import { describe, expect, it, vi } from "vitest";

import { useSentenceInput } from "../../question";

describe("question", () => {
  it("should be correct when checked the answer", async () => {
    const { setInputValue, submitAnswer } = useSentenceInput(() => "i eat");

    setInputValue("i eat");

    const correctCallback = vi.fn();
    const wrongCallback = vi.fn();
    submitAnswer(correctCallback, wrongCallback);

    expect(correctCallback).toBeCalled();
    expect(wrongCallback).not.toBeCalled();
  });

  it("should be incorrect when checked the answer", async () => {
    const { setInputValue, submitAnswer } = useSentenceInput(() => "i eat");

    setInputValue("i like");

    const correctCallback = vi.fn();
    const wrongCallback = vi.fn();
    submitAnswer(correctCallback, wrongCallback);

    expect(correctCallback).not.toBeCalled();
    expect(wrongCallback).toBeCalled();
  });

  it.each(["i don‘t", "i don’t", "i don“t", `i don"t`, `i don”t`])(
    "should be correct when input '%s'",
    async (input) => {
      const { setInputValue, submitAnswer } = useSentenceInput(() => "i don't");

      setInputValue(input);

      const correctCallback = vi.fn();
      const wrongCallback = vi.fn();
      submitAnswer(correctCallback, wrongCallback);

      expect(correctCallback).toBeCalled();
      expect(wrongCallback).not.toBeCalled();
    },
  );
});
