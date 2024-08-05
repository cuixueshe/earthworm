import { courseTimer } from "~/composables/courses/courseTimer";
import { useGameMode } from "~/composables/main/game";
import { useInput } from "~/composables/main/question";
import { useSummary } from "~/composables/main/summary";
import { useAutoNextQuestion } from "~/composables/user/autoNext";
import { useKeyboardSound } from "~/composables/user/sound";
import { useSpaceSubmitAnswer } from "~/composables/user/submitKey";
import { useCourseStore } from "~/store/course";
import { useQuestionInput } from "./questionInputHelper";
import { useAnswerError } from "./useAnswerError";
import { usePlayTipSound, useTypingSound } from "./useTypingSound";

export function useWrapperQuestionInput() {
  const courseStore = useCourseStore();
  const { showAnswer } = useGameMode();
  const { showSummary } = useSummary();
  const { setInputCursorPosition, getInputCursorPosition, blurInput, focusInput } =
    useQuestionInput();
  const { isKeyboardSoundEnabled } = useKeyboardSound();
  const { checkPlayTypingSound, playTypingSound } = useTypingSound();
  const { handleAnswerError } = useAnswerError();
  const { playRightSound } = usePlayTipSound();
  const { isAutoNextQuestion } = useAutoNextQuestion();
  const { isUseSpaceSubmitAnswer } = useSpaceSubmitAnswer();

  const {
    initialize: initializeQuestionInput,
    findWordById,
    inputValue,
    submitAnswer,
    setInputValue,
    handleKeyboardInput,
    isFixMode,
    isFixInputMode,
  } = useInput({
    source: () => courseStore.currentStatement?.english!,
    setInputCursorPosition,
    getInputCursorPosition,
    inputChangedCallback,
  });

  function inputChangedCallback(e: KeyboardEvent) {
    if (isKeyboardSoundEnabled() && checkPlayTypingSound(e)) {
      playTypingSound();
    }
  }

  function handleAnswerRight() {
    courseTimer.timeEnd(String(courseStore.statementIndex)); // 停止当前题目的计时
    playRightSound();

    if (isAutoNextQuestion()) {
      // 自动下一题
      if (courseStore.isAllDone()) {
        blurInput(); // 失去输入焦点，防止结束时光标仍然在输入框，造成后续结算面板回车事件无法触发
        showSummary();
      }
      courseStore.toNextStatement();
    } else {
      showAnswer();
    }
  }

  return {
    initializeQuestionInput,
    isFixMode,
    isFixInputMode,
    findWordById,
    inputValue,
    setInputValue,
    submitAnswer() {
      submitAnswer(handleAnswerRight, handleAnswerError);
      focusInput();
    },
    handleKeyboardInput(e: KeyboardEvent) {
      handleKeyboardInput(e, {
        useSpaceSubmitAnswer: {
          enable: isUseSpaceSubmitAnswer(),
          rightCallback: handleAnswerRight,
          errorCallback: handleAnswerError,
        },
      });
    },
  };
}
