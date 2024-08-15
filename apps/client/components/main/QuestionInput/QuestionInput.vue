<template>
  <div class="text-center">
    <div class="relative flex flex-wrap justify-center gap-2 transition-all">
      <template
        v-for="(w, i) in courseStore.words"
        :key="i"
      >
        <div
          v-if="isWord(w)"
          class="h-[4rem] rounded-[2px] border-b-2 border-solid text-[3em] leading-none transition-all"
          :class="getWordsClassNames(i)"
          :style="{ minWidth: `${inputWidth(w)}ch` }"
        >
          {{ findWordById(i)!.userInput }}
        </div>
        <div
          v-else
          class="h-[4rem] rounded-[2px] text-[3em] leading-none transition-all"
        >
          {{ w }}
        </div>
      </template>
      <input
        lang="en"
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
    <div class="mt-12 flex flex-col items-center justify-center gap-4 md:hidden">
      <button
        class="btn btn-outline btn-sm"
        @click="handleSubmitAnswer"
      >
        提交
      </button>
      <div class="flex gap-4">
        <button
          class="btn btn-outline btn-sm"
          @click="handleShowAnswerTip"
        >
          {{ isAnswerTip() ? "隐藏" : "显示" }}答案
        </button>
        <button
          class="btn btn-outline btn-sm"
          @click="handlePlaySound"
        >
          播放声音
        </button>
      </div>
      <MainMasteredBtn></MainMasteredBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { toast } from "vue-sonner";

import { courseTimer } from "~/composables/courses/courseTimer";
import { useAnswerTip } from "~/composables/main/answerTip";
import { useCurrentStatementEnglishSound } from "~/composables/main/englishSound";
import { isWord } from "~/composables/main/question";
import { useShowWordsWidth } from "~/composables/user/words";
import { useCourseStore } from "~/store/course";
import { isWindows } from "~/utils/platform";
import { getWordWidth, useQuestionInput } from "./questionInputHelper";
import { useAnswerError } from "./useAnswerError";
import { useWrapperQuestionInput } from "./useWrapperQuestionInput";

const courseStore = useCourseStore();
const { inputEl, focusing, focusInput, blurInput } = useQuestionInput();
const {
  initializeQuestionInput,
  findWordById,
  isFixMode,
  inputValue,
  submitAnswer,
  handleKeyboardInput,
  setInputValue,
} = useWrapperQuestionInput();
const { isShowWordsWidth } = useShowWordsWidth();
const { toggleAnswerTip, isAnswerTip } = useAnswerTip();
const { resetCloseTip } = useAnswerError();
initializeQuestionInput();
focusInputWhenWIndowFocus();

onMounted(() => {
  focusInput();
  resetCloseTip();
});

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

const { playSound } = useCurrentStatementEnglishSound();
function handlePlaySound(e: MouseEvent) {
  e.preventDefault();
  playSound();
}

function handleShowAnswerTip(e: MouseEvent) {
  e.preventDefault();
  toggleAnswerTip();
}

function handleSubmitAnswer() {
  submitAnswer();
}

function getWordsClassNames(index: number) {
  const word = findWordById(index)!;
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

// 输入宽度
function inputWidth(word: string) {
  if (!isShowWordsWidth()) {
    // 不显示对应单词宽度，默认 4 字符宽度
    return 4;
  }

  return getWordWidth(word);
}

// // 中文输入会导致先触发 handleKeydown
// // 但是这时候字符还没有上屏
// // 就会造成触发 submit answer  导致明明答案正确但是不通过的问题
// // 通过检测是否为输入法 来避免按下 enter 后直接触发 submit answer
let isComposing = ref(false);
function handleCompositionStart() {
  isComposing.value = true;
}

function handleCompositionEnd() {
  isComposing.value = false;
}

function handleKeydown(e: KeyboardEvent) {
  // 给 windows 用户添加 ctrl + backspace 删除上一个单词的快捷键
  // 有些浏览器 input 不支持通过 ctrl + backspace 删除 所以自行扩展下
  if (e.code === "Backspace" && e.ctrlKey && isWindows()) {
    e.preventDefault();
    deletePreviousWordOnWin();
    return;
  }

  // 避免在某些中文输入法中，按下 Ctrl 键时，输入法会将当前的预输入字符上屏
  if (e.ctrlKey) {
    e.preventDefault();
    return;
  }

  if (e.code === "Enter" && !isComposing.value) {
    e.stopPropagation();
    submitAnswer();
    return;
  }

  handleKeyboardInput(e);
}

function deletePreviousWordOnWin() {
  var start = inputEl.value!.selectionStart!;
  var end = inputEl.value!.selectionEnd!;
  if (end === 0) return;

  // 删除光标前的所有连续空格
  while (start > 0 && inputValue.value[start - 1] === " ") {
    start--;
  }
  var valueToCursor = inputValue.value.substring(0, start);
  var newEnd = valueToCursor.lastIndexOf(" ") + 1 || 0;
  inputValue.value = inputValue.value.substring(0, newEnd);
  inputEl.value!.setSelectionRange(newEnd, newEnd);
}

function preventCursorMove(event: MouseEvent) {
  // 阻止 mousedown 事件的默认行为
  // 它会改变 input 光标的位置
  event.preventDefault();
  // 只允许 input focus
  focusInput();
}
</script>
