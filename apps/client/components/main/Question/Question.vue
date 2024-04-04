<template>
  <div class="text-center">
    <div class="mt-10 mb-4 text-2xl dark:text-gray-50">
      {{
        courseStore.currentStatement?.chinese || "生存还是毁灭，这是一个问题"
      }}
    </div>
    <div class="relative flex flex-wrap justify-center gap-2 transition-all">
      <template
        v-for="(w, i) in courseStore.words"
        :key="i"
      >
        <div
          class="h-[4rem] leading-none border-solid rounded-[2px] border-b-2 text-[3em] transition-all"
          :class="getWordsClassNames(i)"
          :style="{ minWidth: `${inputWidth(w)}ch` }"
        >
          {{ userInputWords[i]["userInput"] }}
        </div>
      </template>
      <input
        ref="inputEl"
        class="absolute w-full h-full opacity-0"
        type="text"
        v-model="inputValue"
        @keydown="handleKeydown"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
        @focus="focusInput"
        @blur="blurInput"
        @dblclick.prevent
        @mousedown="preventCursorMove"
        autoFocus
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { courseTimer } from "~/composables/courses/courseTimer";
import { useAnswerTip } from "~/composables/main/answerTip";
import { useGameMode } from "~/composables/main/game";
import { useInput } from "~/composables/main/question";
import { useKeyboardSound } from "~/composables/user/sound";
import { useSpaceSubmitAnswer } from "~/composables/user/submitKey";
import { useShowWordsWidth } from "~/composables/user/words";
import { useCourseStore } from "~/store/course";
import { useQuestionInput } from "./questionInput";
import { usePlayTipSound, useTypingSound } from "./useTypingSound";
const isComposing = ref(false); // 跟踪输入法的组合输入状态
const courseStore = useCourseStore();
function handleCompositionStart() {
  isComposing.value = true;
}

// 处理组合输入的结束
function handleCompositionEnd() {
  isComposing.value = false;
}

const {
  inputEl,
  focusing,
  focusInput,
  blurInput,
  setInputCursorPosition,
  getInputCursorPosition,
} = useQuestionInput();

const { showAnswer } = useGameMode();
const { isShowWordsWidth } = useShowWordsWidth();
const { isUseSpaceSubmitAnswer } = useSpaceSubmitAnswer();
const { isKeyboardSoundEnabled } = useKeyboardSound();
const { checkPlayTypingSound, playTypingSound } = useTypingSound();
const { playRightSound, playErrorSound } = usePlayTipSound();
const { handleAnswerError, resetCloseTip } = answerError();

const {
  inputValue,
  userInputWords,
  submitAnswer,
  setInputValue,
  handleKeyboardInput,
  isFixMode,
} = useInput({
  source: () => courseStore.currentStatement?.english!,
  setInputCursorPosition,
  getInputCursorPosition,
  inputChangedCallback,
});
const { showAnswerTip, hiddenAnswerTip } = useAnswerTip();

onMounted(() => {
  focusInput();
  resetCloseTip();
});

watch(
  () => inputValue.value,
  (val) => {
    setInputValue(val);
    courseTimer.time(String(courseStore.statementIndex));
  }
);

watch(
  () => courseStore.statementIndex,
  () => {
    focusInput();
    resetCloseTip();
  }
);

function getWordsClassNames(index: number) {
  const word = userInputWords[index];
  // 当前单词激活 且 聚焦
  if (word.isActive && focusing.value) {
    return "text-fuchsia-500 border-b-fuchsia-500";
  }

  // 当前单词错误 且 聚焦
  if (word.incorrect && focusing.value) {
    // Fix 修复模式添加动画
    return `text-red-500 border-b-red-500 ${isFixMode() && "animate-shake"}`;
  }

  // 默认样式
  return "text-[#20202099] border-b-gray-300 dark:text-gray-300 dark:border-b-gray-400";
}

function inputChangedCallback(e: KeyboardEvent) {
  if (isKeyboardSoundEnabled() && checkPlayTypingSound(e)) {
    playTypingSound();
  }
}

// 输入宽度
function inputWidth(word: string) {
  if (!isShowWordsWidth()) {
    // 不显示对应单词宽度，默认 4 字符宽度
    return 4;
  }

  // 单词宽度
  let width = 0;

  // 单词转小写字符数组
  word = word.toLocaleLowerCase();
  const wordArr = word.split("");

  // 字符宽度1.1的字符数组
  const onePointOneLetters = ["u", "o", "p", "q", "n", "h", "g", "d", "b"];

  // 字符宽度0.9的字符数组
  const zeroPointNineLetters = ["z", "y", "x", "v", "c"];

  for (let letter of wordArr) {
    if (letter === "w" || letter === "m") {
      width += 1.5;
      continue;
    }
    if (letter === "s") {
      width += 0.8;
      continue;
    }
    if (letter === "t" || letter === "r" || letter === "f") {
      width += 0.7;
      continue;
    }
    if (letter === "j") {
      width += 0.6;
      continue;
    }
    if (letter === "i" || letter === "l" || letter === "'") {
      width += 0.5;
      continue;
    }

    // 记录是否已经增加宽度
    let increasedWidth = false;

    for (let key of onePointOneLetters) {
      if (key === letter) {
        width += 1.1;
        increasedWidth = true;
        break;
      }
    }

    for (let key of zeroPointNineLetters) {
      if (key === letter) {
        width += 0.9;
        increasedWidth = true;
        break;
      }
    }

    // 未增加宽度
    if (!increasedWidth) {
      width += 1;
    }
  }

  // 左右留白
  width += 1;

  return width;
}

function answerError() {
  let wrongTimes = 0;

  function handleAnswerError() {
    playErrorSound();
    wrongTimes++;
    if (wrongTimes >= 3) {
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
  playRightSound(); // 正确提示
  showAnswer();
  hiddenAnswerTip();
  courseTimer.timeEnd(String(courseStore.statementIndex));
}

function handleKeydown(e: KeyboardEvent) {
  if (e.code === "Enter" && !isComposing.value) {
    // 每次回车会手动的调用一次setInputValue已确保拿到最新的input value，用于解决中文输入法输入回车后值为旧值的情况
    setInputValue(inputEl.value?.value || "");
    e.stopPropagation();
    submitAnswer(
      handleAnswerRight,
      handleAnswerError // 错误提示
    );
    return;
  }

  handleKeyboardInput(e, {
    useSpaceSubmitAnswer: {
      enable: isUseSpaceSubmitAnswer(),
      rightCallback: handleAnswerRight,
      errorCallback: handleAnswerError, // 错误提示
    },
  });
}

function preventCursorMove(event: MouseEvent) {
  // 阻止 mousedown 事件的默认行为
  // 它会改变 input 光标的位置
  event.preventDefault();
  // 只允许 input focus
  focusInput();
}
</script>
