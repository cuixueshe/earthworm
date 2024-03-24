import { nextTick, reactive, ref, watchEffect } from "vue";

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
    updateActiveWord(val ? getInputCursorPosition() : 0);
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
      resetUserInputWords();

      const english = source();
      english
        .split(separator)
        .map(createWord)
        .forEach((word, i) => {
          userInputWords[i] = word;
          // 首个单词自动聚焦
          i === 0 && (userInputWords[0].isActive = true);
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

  // 当前编辑的单词是否为最后一个错误单词
  function isLastIncorrectWord() {
    return !findNextIncorrectWordNew();
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

  function checkSpaceSubmitAnswer(
    e: KeyboardEvent,
    useSpaceSubmitAnswer: { enable: boolean; callback: () => void } | undefined
  ) {
    e.preventDefault();
    if (useSpaceSubmitAnswer?.enable) {
      submitAnswer(useSpaceSubmitAnswer.callback);
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

    // 校验正常输入时最后一个单词空格提交
    if (e.code === "Space" && lastWordIsActive()) {
      checkSpaceSubmitAnswer(e, options.useSpaceSubmitAnswer);
      return;
    }

    if (
      e.code === "Space" &&
      mode === Mode.Fix_Input &&
      isLastIncorrectWord()
    ) {
      checkSpaceSubmitAnswer(e, options.useSpaceSubmitAnswer);
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

  function resetUserInputWords() {
    // 避免在 Fix 模式下重置导致用户不能输入
    mode = Mode.Input;
    inputValue.value = "";
    userInputWords.splice(0, userInputWords.length);
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
    resetUserInputWords,
  };
}
