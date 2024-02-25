import { nextTick, watch, reactive, ref, watchEffect, type Ref } from "vue";

enum Mode {
  Input = "input",
  Fix = "fix",
  Fix_Input = "fix-input",
}

interface Word {
  text: string;
  isActive: boolean;
  userInput: string;
  incorrect: boolean;
  end: number;
  start: number;
  position: number;
}

export function useInput(
  source: () => string,
  {
    setInputCursorPosition,
    getInputCursorPosition,
  }: {
    setInputCursorPosition: (position: number) => void;
    getInputCursorPosition: () => number;
  }
) {
  let mode: Mode = Mode.Input;
  const inputValue = ref("");
  const userInputWords = reactive<Word[]>([]);

  let currentEditWord: any;

  function createWord(word: string, id: number) {
    return reactive({
      id,
      text: word,
      isActive: false,
      userInput: "",
      incorrect: false,
      start: 0,
      end: 0,
      position: 0,
    });
  }

  watchEffect(() => {
    const english = source();
    english
      .split(" ")
      .map(createWord)
      .forEach((word, i) => {
        userInputWords[i] = word;
      });
  });

  function userHasNoInput() {
    return inputValue.value.length < 1;
  }

  function userInputWordsSyncInput() {
    inputValue.value = userInputWords
      .map(({ userInput }) => {
        return userInput;
      })
      .join(" ");
  }

  function inputSyncUserInputWords() {
    let position = 0;

    inputValue.value.split(" ").forEach((input, index) => {
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
      }
    });
  }

  function focusOnLastWord() {
    const position = inputValue.value.length;
    updateActiveWord(position);
    setInputCursorPosition(position);
  }

  function lastWordIsActive() {
    let len = userInputWords.length;
    return userInputWords[len - 1].isActive;
  }

  function findNextIncorrectWordNew() {
    return userInputWords.find((word) => {
      return word.incorrect;
    })!;
  }

  function clearNextIncorrectWord() {
    const word = findNextIncorrectWordNew();
    word.userInput = "";
    word.incorrect = false;

    currentEditWord = word;

    userInputWordsSyncInput();

    nextTick(() => {
      setInputCursorPosition(word.start);
      updateActiveWord(word.start);
    });
  }

  watch(
    () => inputValue.value,
    () => {
      resetAllWordUserInput();
      if (userHasNoInput()) return;
      inputSyncUserInputWords();
    }
  );

  watch(
    () => inputValue.value,
    () => {
      updateActiveWord(getInputCursorPosition());
    },
    {
      immediate: true,
    }
  );

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

  function firstFix() {
    if (mode === Mode.Fix) {
      mode = Mode.Fix_Input;

      clearNextIncorrectWord();
    }
  }

  function nextFix() {
    if (mode === Mode.Fix_Input) {
      if (checkWordCorrect()) {
        mode = Mode.Input;
        focusOnLastWord();
        return;
      }

      clearNextIncorrectWord();
    }
  }

  function fix() {
    if (mode === Mode.Fix) {
      firstFix();
    } else if (mode === Mode.Fix_Input) {
      nextFix();
    }
  }

  function preventAnyInputWhenFix(e: KeyboardEvent) {
    if (mode === Mode.Fix) {
      e.preventDefault();
    }
  }

  function preventMove(e: KeyboardEvent) {
    if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
      e.preventDefault();
    }
  }

  function preventSpaceWhenFixInput(e: KeyboardEvent) {
    if (e.code === "Space" && mode === Mode.Fix_Input) {
      e.preventDefault();
    }
  }

  function preventInputSpaceOnLastWord(e: KeyboardEvent) {
    if (e.code === "Space" && lastWordIsActive()) {
      e.preventDefault();
    }
  }

  function preventBackspaceWhenFixInput(e: KeyboardEvent) {
    if (e.code === "Backspace" && mode === Mode.Fix_Input) {
      if (currentEditWord.userInput.length <= 0) {
        e.preventDefault();
      }
    }
  }

  function preventInput(e: KeyboardEvent) {
    preventAnyInputWhenFix(e);
    preventMove(e);
    preventSpaceWhenFixInput(e);
    preventInputSpaceOnLastWord(e);
    preventBackspaceWhenFixInput(e);
  }

  return {
    inputValue,
    userInputWords,
    nextFix,
    firstFix,
    fix,
    preventInput,
    submitAnswer,
  };
}
