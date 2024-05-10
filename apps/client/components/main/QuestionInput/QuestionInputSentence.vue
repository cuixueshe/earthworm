<template>
  <div class="text-center">
    <div class="relative flex flex-wrap justify-center gap-2 transition-all">
      <div
        :class="getSentenceClassNames()"
        class="h-[4rem] rounded-[2px] border-b-2 border-solid px-8 text-[3em] leading-none transition-all"
      >
        {{ inputValue }}
      </div>
      <input
        ref="inputEl"
        class="absolute h-full w-full opacity-0"
        type="text"
        v-model="inputValue"
        @keydown="handleKeydown"
        @focus="focusInput"
        @blur="blurInput"
        @dblclick.prevent
        @mousedown="preventCursorMove"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
        autoFocus
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

import { courseTimer } from "~/composables/courses/courseTimer";
import { useAnswerTip } from "~/composables/main/answerTip";
import { useGameMode } from "~/composables/main/game";
import { useSentenceInput } from "~/composables/main/question";
import { useSummary } from "~/composables/main/summary";
import { useAutoNextQuestion } from "~/composables/user/autoNext";
import { useErrorTip } from "~/composables/user/errorTip";
import { useKeyboardSound } from "~/composables/user/sound";
import { useShowWordsWidth } from "~/composables/user/words";
import { useCourseStore } from "~/store/course";
import { useQuestionInput } from "./questionInputHelper";
import { usePlayTipSound, useTypingSound } from "./useTypingSound";

const courseStore = useCourseStore();
const { inputEl, focusing, focusInput, blurInput } = useQuestionInput();

const { showAnswer } = useGameMode();
const { showSummary } = useSummary();
const { isShowWordsWidth } = useShowWordsWidth();
const { isKeyboardSoundEnabled } = useKeyboardSound();
const { checkPlayTypingSound, playTypingSound } = useTypingSound();
const { playRightSound, playErrorSound } = usePlayTipSound();
const { handleAnswerError, resetCloseTip } = answerError();
const { isAutoNextQuestion } = useAutoNextQuestion();
const { isShowErrorTip } = useErrorTip();

const { inputValue, inputStatus, submitAnswer, setInputValue } = useSentenceInput(
  () => courseStore.currentStatement?.english!,
);

const { showAnswerTip, hiddenAnswerTip } = useAnswerTip();

onMounted(() => {
  focusInput();
  resetCloseTip();
});

focusInputWhenWIndowFocus();

watch(
  () => inputValue.value,
  (val) => {
    setInputValue(val);
    courseTimer.time(String(courseStore.statementIndex));
  },
);

watch(
  () => courseStore.statementIndex,
  () => {
    focusInput();
    resetCloseTip();
  },
);

function focusInputWhenWIndowFocus() {
  const handleFocus = () => {
    focusInput();
  };

  onMounted(() => {
    window.addEventListener("focus", handleFocus);
  });

  onUnmounted(() => {
    window.removeEventListener("focus", handleFocus);
  });
}

function getSentenceClassNames() {
  // const words = useInputWords;
  // let focus;
  // for (let i = 0; i < words.length; i++) {
  //   const word = words[i];
  //   if (word.isActive) focus = true;
  //   if (word.incorrect) return "text-red-500 border-b-red-500";
  // }
  // if (focus) return "text-fuchsia-500 border-b-fuchsia-500";
  // return "text-[#20202099] border-b-gray-300 dark:text-gray-300 dark:border-b-gray-400";
  if (inputStatus.value === "wrong") {
    return "text-red-500 border-b-red-500";
  }
  if (focusing.value) {
    return "text-fuchsia-500 border-b-fuchsia-500";
  }
  return "text-[#20202099] border-b-gray-300 dark:text-gray-300 dark:border-b-gray-400";
}

function inputChangedCallback(e: KeyboardEvent) {
  if (isKeyboardSoundEnabled() && checkPlayTypingSound(e)) {
    playTypingSound();
  }
}

function answerError() {
  let wrongTimes = 0;

  function handleAnswerError() {
    playErrorSound();
    wrongTimes++;
    if (isShowErrorTip() && wrongTimes >= 3) {
      showAnswerTip();
    }
  }

  function resetCloseTip() {
    wrongTimes = 0;
    hiddenAnswerTip();
  }

  return {
    handleAnswerError,
    resetCloseTip,
  };
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

// 中文输入会导致先触发 handleKeydown
// 但是这时候字符还没有上屏
// 就会造成触发 submit answer  导致明明答案正确但是不通过的问题
// 通过检测是否为输入法 来避免按下 enter 后直接触发 submit answer
let isComposing = ref(false);
function handleCompositionStart() {
  isComposing.value = true;
}

function handleCompositionEnd() {
  isComposing.value = false;
}

function handleKeydown(e: KeyboardEvent) {
  // 避免在某些中文输入法中，按下 Ctrl 键时，输入法会将当前的预输入字符上屏
  if (e.ctrlKey) {
    e.preventDefault();
    return;
  }

  if (e.code === "Enter" && !isComposing.value) {
    e.stopPropagation();
    submitAnswer(handleAnswerRight, handleAnswerError);
    return;
  }

  inputChangedCallback(e);
}

function preventCursorMove(event: MouseEvent) {
  // 阻止 mousedown 事件的默认行为
  // 它会改变 input 光标的位置
  event.preventDefault();
  // 只允许 input focus
  focusInput();
}
</script>
