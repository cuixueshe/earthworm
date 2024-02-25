import { vi, it, expect, describe } from "vitest";
import { useInput } from "../question";

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
          "incorrect": false,
          "isActive": true,
          "position": 0,
          "start": 0,
          "text": "i",
          "userInput": "i",
        },
        {
          "end": 5,
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
    submitAnswer(correctCallback);

    expect(correctCallback).toBeCalled();
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
    submitAnswer(correctCallback);

    expect(correctCallback).not.toBeCalled();
    expect(userInputWords[1].incorrect).toBe(true);
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

    const {
      setInputValue,
      userInputWords,
      submitAnswer,
      fixFirstIncorrectWord,
    } = useInput({
      source: () => "i eat",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    setInputValue("he eat");
    submitAnswer(() => {});
    await fixFirstIncorrectWord();

    expect(userInputWords[0].userInput).toBe("");
    expect(userInputWords[0].isActive).toBe(true);
  });

  it("should be possible to clear out the wrong words in turn", async () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;

    const { setInputValue, userInputWords, submitAnswer, fixIncorrectWord } =
      useInput({
        source: () => "i eat apple",
        setInputCursorPosition,
        getInputCursorPosition,
      });

    setInputValue("he eats a");
    submitAnswer(() => {});

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

  it("should prevent any input when fix mode", () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;

    const { setInputValue, submitAnswer, preventInput } = useInput({
      source: () => "i eat apple",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    setInputValue("i ea ap");

    submitAnswer(() => {});

    const preventDefault = vi.fn();
    preventInput({
      code: "i",
      preventDefault,
    } as any as KeyboardEvent);

    expect(preventDefault).toBeCalled();
  });

  it("should prevent move", () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;

    const { setInputValue, submitAnswer, preventInput } = useInput({
      source: () => "i eat apple",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    setInputValue("i ea ap");

    // move to left
    const preventDefaultLeft = vi.fn();
    preventInput({
      code: "ArrowLeft",
      preventDefault: preventDefaultLeft,
    } as any as KeyboardEvent);
    expect(preventDefaultLeft).toBeCalled();

    // move to right
    const preventDefaultRight = vi.fn();
    preventInput({
      code: "ArrowLeft",
      preventDefault: preventDefaultRight,
    } as any as KeyboardEvent);
    expect(preventDefaultRight).toBeCalled();
  });

  it("should prevent space when fix input", async () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;

    const { setInputValue, submitAnswer, preventInput, fixIncorrectWord } =
      useInput({
        source: () => "i eat apple",
        setInputCursorPosition,
        getInputCursorPosition,
      });

    setInputValue("i ea ap");
    submitAnswer(() => {});
    await fixIncorrectWord();

    const preventDefault = vi.fn();
    preventInput({
      code: "Space",
      preventDefault,
    } as any as KeyboardEvent);

    expect(preventDefault).toBeCalled();
  });

  it("should prevent backspace when fix input", async () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = () => 0;

    const { setInputValue, submitAnswer, preventInput, fixIncorrectWord } =
      useInput({
        source: () => "i eat apple",
        setInputCursorPosition,
        getInputCursorPosition,
      });

    setInputValue("i ea apple");
    submitAnswer(() => {});
    await fixIncorrectWord();

    const preventDefault = vi.fn();
    preventInput({
      code: "Backspace",
      preventDefault,
    } as any as KeyboardEvent);

    expect(preventDefault).toBeCalled();
  });

  it("should prevent space when focus on last word", async () => {
    const setInputCursorPosition = () => {};
    const getInputCursorPosition = vi.fn();

    const { setInputValue, preventInput } = useInput({
      source: () => "i eat apple",
      setInputCursorPosition,
      getInputCursorPosition,
    });

    const inputValue = "i eat apple";
    getInputCursorPosition.mockReturnValue(inputValue.length);
    setInputValue(inputValue);

    const preventDefault = vi.fn();
    preventInput({
      code: "Space",
      preventDefault,
    } as any as KeyboardEvent);

    expect(preventDefault).toBeCalled();
  });
});
