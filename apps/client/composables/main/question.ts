import { nextTick, reactive, ref, watchEffect, type Ref } from "vue";

interface Word {
  text: string;
  isActive: boolean;
  userInput: string;
  incorrect: boolean;
  end: number;
  start: number;
  position: number;
  id: number;
}

interface InputOptions {
  source: () => string;
  setInputCursorPosition: (position: number) => void;
  getInputCursorPosition: () => number;
}

enum Mode {
  Input = "input",
  Fix = "fix",
  Fix_Input = "fix-input",
}

const separator = " ";

export function useInput({
  source,
  setInputCursorPosition,
  getInputCursorPosition,
}: InputOptions) {
  let mode: Mode = Mode.Input;
  let currentEditWord: Word;

  const inputValue = ref("");
  const userInputWords = reactive<Word[]>([]);

  setupUserInputWords();
  updateActiveWord(getInputCursorPosition());

  function setInputValue(val: string) {
    inputValue.value = val;
    resetAllWordUserInput();
    inputSyncUserInputWords();
    updateActiveWord(getInputCursorPosition());
  }

  function createWord(word: string, id: number) {
    return reactive({
      text: word,
      isActive: false,
      userInput: "",
      incorrect: false,
      start: 0,
      end: 0,
      position: 0,
      id,
    } as Word);
  }

  function setupUserInputWords() {
    watchEffect(() => {
      const english = source();
      english
        .split(separator)
        .map(createWord)
        .forEach((word, i) => {
          userInputWords[i] = word;
        });
    });
  }

  function userInputWordsSyncInput() {
    inputValue.value = userInputWords
      .map(({ userInput }) => {
        return userInput;
      })
      .join(separator);
  }

  function inputSyncUserInputWords() {
    let position = 0;

    inputValue.value.split(separator).forEach((input, index) => {
      userInputWords[index].userInput = input;

      userInputWords[index].start = position;
      userInputWords[index].end = position + input.length;

      position += input.length + 1; // Add 1 for the space after each word
    });
  }

  function resetAllWordUserInput() {
    userInputWords.forEach((word) => {
      word.userInput = "";
    });
  }

  function resetAllWordActive() {
    userInputWords.forEach((word) => {
      word.isActive = false;
    });
  }

  function updateActiveWord(position: number) {
    resetAllWordActive();

    for (let i = 0; i < userInputWords.length; i++) {
      const word = userInputWords[i];
      if (position >= word.start && position <= word.end) {
        word.isActive = true;
        break;
      }
    }
  }

  function checkWordCorrect() {
    return userInputWords.every((w) => !w.incorrect);
  }

  function markIncorrectWord() {
    userInputWords.forEach((word) => {
      if (
        word.userInput.toLocaleLowerCase() !== word.text.toLocaleLowerCase()
      ) {
        word.incorrect = true;
      } else {
        word.incorrect = false;
      }
    });
  }

  function lastWordIsActive() {
    let len = userInputWords.length;
    return userInputWords[len - 1].isActive;
  }

  function findNextIncorrectWordNew() {
    if (!currentEditWord) return;

    const wordIndex = userInputWords.findIndex(
      (w) => w.id === currentEditWord.id
    );

    let len = userInputWords.length;
    for (let i = wordIndex + 1; i < len; i++) {
      const word = userInputWords[i];
      if (word.incorrect) {
        return word;
      }
    }
  }

  function getFirstIncorrectWord() {
    return userInputWords.find((w) => w.incorrect);
  }

  async function clearNextIncorrectWord() {
    let word = findNextIncorrectWordNew();
    if (!word) {
      word = getFirstIncorrectWord()!;
    }

    word.userInput = "";

    currentEditWord = word;

    userInputWordsSyncInput();

    await nextTick();

    setInputCursorPosition(word.start);
    updateActiveWord(word.start);
  }

  function submitAnswer(correctCallback: () => void) {
    if (mode === Mode.Fix) return;
    resetAllWordActive();
    markIncorrectWord();

    if (checkWordCorrect()) {
      mode = Mode.Input;
      correctCallback();
      inputValue.value = "";
    } else {
      mode = Mode.Fix;
    }
  }

  async function fixFirstIncorrectWord() {
    if (mode === Mode.Fix) {
      mode = Mode.Fix_Input;

      await clearNextIncorrectWord();
    }
  }

  async function fixNextIncorrectWord() {
    if (mode === Mode.Fix_Input) {
      await clearNextIncorrectWord();
    }
  }

  async function fixIncorrectWord() {
    if (mode === Mode.Fix) {
      await fixFirstIncorrectWord();
    } else if (mode === Mode.Fix_Input) {
      await fixNextIncorrectWord();
    }
  }

  function isEmptyOfCurrentEditWord() {
    return currentEditWord.userInput.length <= 0;
  }

  function findPreviousIncorrectWord() {
    if (!currentEditWord) return;

    const wordIndex = userInputWords.findIndex(
      (w) => w.id === currentEditWord.id
    );

    for (let i = wordIndex - 1; i >= 0; i--) {
      const word = userInputWords[i];
      if (word.incorrect) {
        return word;
      }
    }
  }

  async function activePreviousIncorrectWord() {
    const previousIncorrectWord = findPreviousIncorrectWord();

    if (previousIncorrectWord) {
      currentEditWord = previousIncorrectWord;

      await nextTick();

      updateActiveWord(previousIncorrectWord.end);
      setInputCursorPosition(previousIncorrectWord.end);
    }
  }

  function handleKeyboardInput(
    e: KeyboardEvent,
    options: {
      useSpaceSubmitAnswer?: { enable: boolean; callback: () => void };
    } = {}
  ) {
    if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
      e.preventDefault();
      return;
    }

    if (e.code !== "Space" && e.code !== "Backspace" && mode === Mode.Fix) {
      e.preventDefault();
      return;
    }

    if (e.code === "Space" && lastWordIsActive()) {
      e.preventDefault();
      if (options.useSpaceSubmitAnswer?.enable) {
        submitAnswer(options.useSpaceSubmitAnswer.callback);
      }
      return;
    }

    if (
      e.code === "Backspace" &&
      mode === Mode.Fix_Input &&
      isEmptyOfCurrentEditWord()
    ) {
      e.preventDefault();
      activePreviousIncorrectWord();
      return;
    }

    if (e.code === "Space" && mode !== Mode.Input) {
      e.preventDefault();
      fixIncorrectWord();
    } else if (e.code === "Backspace" && mode === Mode.Fix) {
      e.preventDefault();
      fixFirstIncorrectWord();
    }
  }

  return {
    inputValue,
    userInputWords,
    submitAnswer,
    setInputValue,
    activePreviousIncorrectWord,
    handleKeyboardInput,
    fixIncorrectWord,
    fixFirstIncorrectWord,
  };
}
