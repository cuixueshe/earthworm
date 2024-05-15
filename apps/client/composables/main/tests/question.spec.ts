import { describe, expect, it, vi } from "vitest";

import { isWord, useInput } from "../question";

describe("question", () => {
  it("should parse user input correctly", () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;

    const { userInputWords, setInputValue } = useInput({
      source: () => "i eat",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    setInputValue("i eat");

    expect(userInputWords).toMatchInlineSnapshot(`
      [
        {
          "end": 1,
          "id": 0,
          "incorrect": false,
          "isActive": true,
          "position": 0,
          "start": 0,
          "text": "i",
          "userInput": "i",
        },
        {
          "end": 5,
          "id": 1,
          "incorrect": false,
          "isActive": false,
          "position": 0,
          "start": 2,
          "text": "eat",
          "userInput": "eat",
        },
      ]
    `);
  });

  it("should filter all symbol", () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;
    const { userInputWords } = useInput({
      source: () => `i " like " the food ?`,
      setInputCursorPosition,
      getInputCursorPosition,
    });

    expect(userInputWords.length).toBe(4);
  });

  it("should find word by id", () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;
    const { userInputWords, findWordById } = useInput({
      source: () => `i " like " the food ?`,
      setInputCursorPosition,
      getInputCursorPosition,
    });

    expect(findWordById(0)?.text).toBe("i");
    expect(findWordById(2)?.text).toBe("like");
    expect(findWordById(4)?.text).toBe("the");
    expect(findWordById(5)?.text).toBe("food");
  });

  it("should be correct when checked the answer", async () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;

    const { setInputValue, submitAnswer } = useInput({
      source: () => "i eat",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    setInputValue("i eat");

    const correctCallback = vi.fn();
    const wrongCallback = vi.fn();
    submitAnswer(correctCallback, wrongCallback);

    expect(correctCallback).toBeCalled();
    expect(wrongCallback).not.toBeCalled();
  });

  it("should be incorrect when checked the answer", async () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;

    const { userInputWords, setInputValue, submitAnswer } = useInput({
      source: () => "i eat",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    setInputValue("i like");

    const correctCallback = vi.fn();
    const wrongCallback = vi.fn();
    submitAnswer(correctCallback, wrongCallback);

    expect(correctCallback).not.toBeCalled();
    expect(wrongCallback).toBeCalled();
    expect(userInputWords[1].incorrect).toBe(true);
  });

  it.each(["i don‘t", "i don’t", "i don“t", `i don"t`, `i don”t`])(
    "should be correct when input '%s'",
    async (input) => {
      const setInputCursorPosition = () => {};
      const getInputCursorPosition = () => 0;

      const { setInputValue, submitAnswer } = useInput({
        source: () => "i don't",
        setInputCursorPosition,
        getInputCursorPosition,
      });

      setInputValue(input);

      const correctCallback = vi.fn();
      const wrongCallback = vi.fn();
      submitAnswer(correctCallback, wrongCallback);

      expect(correctCallback).toBeCalled();
      expect(wrongCallback).not.toBeCalled();
    },
  );

  it("should be the first word should be active", () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;

    const { userInputWords } = useInput({
      source: () => "i eat",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    expect(userInputWords[0].isActive).toBe(true);
  });

  it("should be the first word should be active", () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;

    const { userInputWords } = useInput({
      source: () => "i eat",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    expect(userInputWords[0].isActive).toBe(true);
  });

  it("should be changed the activated word based on the user's input", () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = vi.fn();

    const { userInputWords, setInputValue } = useInput({
      source: () => "i eat",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    getInputCursorPosition.mockReturnValue(1);
    setInputValue("i");
    expect(userInputWords[0].isActive).toBe(true);

    getInputCursorPosition.mockReturnValue(2);
    setInputValue("i ");
    expect(userInputWords[1].isActive).toBe(true);

    getInputCursorPosition.mockReturnValue(3);
    setInputValue("i e");
    expect(userInputWords[1].isActive).toBe(true);

    getInputCursorPosition.mockReturnValue(3);
    setInputValue("iea");
    expect(userInputWords[0].isActive).toBe(true);
  });

  it("should be cleared the first incorrect word", async () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;

    const { setInputValue, userInputWords, submitAnswer, fixIncorrectWord } = useInput({
      source: () => "i eat",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    setInputValue("he eat");
    submitAnswer();
    await fixIncorrectWord();

    expect(userInputWords[0].userInput).toBe("");
    expect(userInputWords[0].isActive).toBe(true);
  });

  it("should be cleared the first incorrect word when press submit again", async () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;

    const { setInputValue, userInputWords, submitAnswer, fixIncorrectWord } = useInput({
      source: () => "i eat",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    setInputValue("he eat");
    submitAnswer();
    await fixIncorrectWord();

    // to next world by input Space
    setInputValue(" ");
    // again submit
    submitAnswer();
    await fixIncorrectWord();

    expect(userInputWords[0].isActive).toBe(true);
  });

  it("should be possible to clear out the wrong words in turn", async () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;

    const { setInputValue, userInputWords, submitAnswer, fixIncorrectWord } = useInput({
      source: () => "i eat apple",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    setInputValue("he eats a");
    submitAnswer();

    await fixIncorrectWord();

    expect(userInputWords[0].userInput).toBe("");
    expect(userInputWords[0].isActive).toBe(true);

    await fixIncorrectWord();

    expect(userInputWords[1].userInput).toBe("");
    expect(userInputWords[1].isActive).toBe(true);

    await fixIncorrectWord();

    expect(userInputWords[2].userInput).toBe("");
    expect(userInputWords[2].isActive).toBe(true);
  });

  it("should prevent move", () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;

    const { setInputValue, handleKeyboardInput } = useInput({
      source: () => "i eat apple",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    setInputValue("i ea ap");

    // move to left
    const preventDefaultLeft = vi.fn();
    handleKeyboardInput({
      code: "ArrowLeft",
      preventDefault: preventDefaultLeft,
    } as any as KeyboardEvent);
    expect(preventDefaultLeft).toBeCalled();

    // move to right
    const preventDefaultRight = vi.fn();
    handleKeyboardInput({
      code: "ArrowLeft",
      preventDefault: preventDefaultRight,
    } as any as KeyboardEvent);
    expect(preventDefaultRight).toBeCalled();
  });

  it("should prevent space when fix input", async () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;

    const { setInputValue, submitAnswer, fixIncorrectWord, handleKeyboardInput } = useInput({
      source: () => "i eat apple",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    setInputValue("i ea ap");
    submitAnswer();
    await fixIncorrectWord();

    const preventDefault = vi.fn();
    handleKeyboardInput({
      code: "Space",
      preventDefault,
    } as any as KeyboardEvent);

    expect(preventDefault).toBeCalled();
  });

  it("should prevent backspace when fix input", async () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;

    const { setInputValue, submitAnswer, fixIncorrectWord, handleKeyboardInput } = useInput({
      source: () => "i eat apple",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    setInputValue("i ea apple");
    submitAnswer();
    await fixIncorrectWord();

    const preventDefault = vi.fn();
    handleKeyboardInput({
      code: "Backspace",
      preventDefault,
    } as any as KeyboardEvent);

    expect(preventDefault).toBeCalled();
  });

  it("should prevent space when focus on last word", async () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = vi.fn();

    const { setInputValue, handleKeyboardInput } = useInput({
      source: () => "i eat apple",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    const inputValue = "i eat apple";
    getInputCursorPosition.mockReturnValue(inputValue.length);
    setInputValue(inputValue);

    const preventDefault = vi.fn();
    const stopPropagation = vi.fn();
    handleKeyboardInput({
      code: "Space",
      preventDefault,
      stopPropagation,
    } as any as KeyboardEvent);

    expect(preventDefault).toBeCalled();
    expect(stopPropagation).toBeCalled();
  });

  it("should back to previous incorrect word", async () => {
    let getInputCursorPosition = () => 0;
    let setInputCursorPosition = () => {};

    const {
      userInputWords,
      setInputValue,
      submitAnswer,
      activePreviousIncorrectWord,
      fixIncorrectWord,
    } = useInput({
      source: () => "i eat apple",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    setInputValue("he eat banana");
    submitAnswer();

    await fixIncorrectWord();
    setInputValue("a");
    await fixIncorrectWord();

    await activePreviousIncorrectWord();

    expect(userInputWords[0].isActive).toBe(true);
    expect(userInputWords[0].userInput).toBe("a");
  });

  it("should submit answer when enable use space", () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = vi.fn();

    const { setInputValue, handleKeyboardInput } = useInput({
      source: () => "i eat apple",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    const inputValue = "i eat apple";
    getInputCursorPosition.mockReturnValue(inputValue.length);
    setInputValue(inputValue);

    const submitAnswerCallback = vi.fn();

    handleKeyboardInput(
      {
        code: "Space",
        preventDefault: () => {},
        stopPropagation: () => {},
      } as any as KeyboardEvent,
      {
        useSpaceSubmitAnswer: {
          enable: true,
          rightCallback: submitAnswerCallback,
        },
      },
    );

    expect(submitAnswerCallback).toBeCalled();
  });

  it("should submit answer when enable use space and fix the last incorrect word", async () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = vi.fn();

    const { setInputValue, userInputWords, submitAnswer, fixIncorrectWord, handleKeyboardInput } =
      useInput({
        source: () => "i eat apple",
        setInputCursorPosition,
        getInputCursorPosition,
      });

    const inputValue = "i e apple";
    getInputCursorPosition.mockReturnValue(inputValue.length);
    setInputValue(inputValue);
    submitAnswer();

    await fixIncorrectWord();

    expect(userInputWords[1].userInput).toBe("");
    expect(userInputWords[1].isActive).toBe(true);

    getInputCursorPosition.mockReturnValue(2);
    userInputWords[1].userInput = "eat";

    const submitAnswerCallback = vi.fn();
    handleKeyboardInput(
      {
        code: "Space",
        preventDefault: () => {},
        stopPropagation: () => {},
      } as any as KeyboardEvent,
      {
        useSpaceSubmitAnswer: {
          enable: true,
          rightCallback: submitAnswerCallback,
        },
      },
    );

    expect(submitAnswerCallback).toBeCalled();
  });

  describe("input change call back", () => {
    it("should trigger when input regular character", () => {
      const setInputCursorPosition = () => {};
      const getInputCursorPosition = vi.fn();
      const inputChangedCallback = vi.fn();

      const { setInputValue, handleKeyboardInput } = useInput({
        source: () => "i eat apple",
        setInputCursorPosition,
        getInputCursorPosition,
        inputChangedCallback,
      });

      const inputValue = "i eat ap";
      getInputCursorPosition.mockReturnValue(inputValue.length);
      setInputValue(inputValue);

      handleKeyboardInput({
        code: "p",
      } as any as KeyboardEvent);

      expect(inputChangedCallback).toBeCalledWith({ code: "p" });
    });

    it("should trigger when press Backspace on fix mode ", () => {
      const setInputCursorPosition = () => {};
      const getInputCursorPosition = vi.fn();
      const inputChangedCallback = vi.fn();

      const { setInputValue, handleKeyboardInput, submitAnswer } = useInput({
        source: () => "i eat apple",
        setInputCursorPosition,
        getInputCursorPosition,
        inputChangedCallback,
      });

      const inputValue = "i eat ap";
      getInputCursorPosition.mockReturnValue(inputValue.length);
      setInputValue(inputValue);

      submitAnswer();

      handleKeyboardInput({
        code: "Backspace",
        preventDefault: () => {},
      } as any as KeyboardEvent);

      expect(inputChangedCallback).toBeCalledWith(expect.objectContaining({ code: "Backspace" }));
    });

    it.each([
      { userInput: "j", isPrevent: false },
      {
        userInput: "f",
        isPrevent: false,
      },

      {
        userInput: "Backspace",
        isPrevent: true,
      },

      {
        userInput: "Space",
        isPrevent: true,
      },
    ])(
      "should fix incorrect world when press $userInput on fix mode ",
      ({ userInput, isPrevent }) => {
        const setInputCursorPosition = () => {};
        const getInputCursorPosition = vi.fn();
        const inputChangedCallback = vi.fn();

        const { setInputValue, handleKeyboardInput, submitAnswer, userInputWords } = useInput({
          source: () => "like code",
          setInputCursorPosition,
          getInputCursorPosition,
          inputChangedCallback,
        });

        const inputValue = "lik co";
        getInputCursorPosition.mockReturnValue(inputValue.length);
        setInputValue(inputValue);

        submitAnswer();

        const preventDefault = vi.fn();
        handleKeyboardInput({
          code: userInput,
          preventDefault,
        } as any as KeyboardEvent);
        getInputCursorPosition.mockReturnValue(0);
        setInputValue(userInput);

        expect(userInputWords[0].isActive).toBe(true);
        expect(userInputWords[0].userInput).toBe(userInput);
        // preventDefault 意味着是否直接上屏
        isPrevent ? expect(preventDefault).toBeCalled() : expect(preventDefault).not.toBeCalled();
      },
    );

    it("should trigger when press Backspace on fix input mode ", () => {
      const setInputCursorPosition = () => {};
      const getInputCursorPosition = vi.fn();
      const inputChangedCallback = vi.fn();

      const { setInputValue, handleKeyboardInput, submitAnswer } = useInput({
        source: () => "i eat apple",
        setInputCursorPosition,
        getInputCursorPosition,
        inputChangedCallback,
      });

      const inputValue = "i eat a";
      getInputCursorPosition.mockReturnValue(inputValue.length);
      setInputValue(inputValue);

      submitAnswer();

      handleKeyboardInput({
        code: "Backspace",
        preventDefault: () => {},
      } as any as KeyboardEvent);

      handleKeyboardInput({
        code: "Backspace",
        preventDefault: () => {},
      } as any as KeyboardEvent);

      expect(inputChangedCallback).toBeCalledTimes(2);
    });
  });
});

describe("isWord", () => {
  it("should return true for a string containing an English letter", () => {
    expect(isWord("hello")).toBe(true);
    expect(isWord("Hello")).toBe(true);
    expect(isWord("123word")).toBe(true);
  });

  it("should return false for a string without any English letters", () => {
    expect(isWord("12345")).toBe(false);
    expect(isWord("—")).toBe(false);
    expect(isWord("！@#$%^&*()")).toBe(false);
    expect(isWord("こんにちは")).toBe(false); // Japanese characters
  });

  it("should return false for an empty string", () => {
    expect(isWord("")).toBe(false);
  });

  it("should correctly identify single English letter", () => {
    expect(isWord("a")).toBe(true);
    expect(isWord("A")).toBe(true);
  });

  it("should return false for strings with only non-alphabetic characters", () => {
    expect(isWord("123-456")).toBe(false);
    expect(isWord(". ,;:!")).toBe(false);
  });
});
