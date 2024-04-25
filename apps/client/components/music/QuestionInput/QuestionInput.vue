<template>
  <div class="text-center">
    <div class="relative flex flex-wrap justify-center gap-2 transition-all">
      <template
        v-for="(w, i) in musicStore.lyricWords"
        :key="i"
      >
        <div
          class="h-[4rem] rounded-[2px] border-b-2 border-solid text-[3em] leading-none transition-all"
          :class="getWordsClassNames(i)"
          :style="{ minWidth: `${inputWidth(w)}ch` }"
        >
          {{ userInputWords[i]["userInput"] }}
        </div>
      </template>
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
import { onMounted, onUnmounted, ref, watch } from "vue";

import { useInput } from "~/composables/main/question";
import { useSummary } from "~/composables/main/summary";
import { useMusicAudio } from "~/composables/music/audio";
import { useKeyboardSound } from "~/composables/user/sound";
import { useSpaceSubmitAnswer } from "~/composables/user/submitKey";
import { useShowWordsWidth } from "~/composables/user/words";
import { useMusicStore } from "~/store/music";
import { getWordWidth, useQuestionInput } from "./questionInputHelper";
import { usePlayTipSound, useTypingSound } from "./useTypingSound";

const musicStore = useMusicStore();
const { inputEl, focusing, focusInput, blurInput, setInputCursorPosition, getInputCursorPosition } =
  useQuestionInput();

const { showSummary } = useSummary();
const { isShowWordsWidth } = useShowWordsWidth();
const { isUseSpaceSubmitAnswer } = useSpaceSubmitAnswer();
const { isKeyboardSoundEnabled } = useKeyboardSound();
const { checkPlayTypingSound, playTypingSound } = useTypingSound();
const { playRightSound, playErrorSound } = usePlayTipSound();
const { handleAnswerError } = answerError();

console.log(111111, musicStore.currentLyric?.english!);

const { inputValue, userInputWords, submitAnswer, setInputValue, handleKeyboardInput, isFixMode } =
  useInput({
    source: () => musicStore.currentLyric?.english!,
    setInputCursorPosition,
    getInputCursorPosition,
    inputChangedCallback,
  });
const { playMusic } = useMusicAudio();

onMounted(() => {
  focusInput();
});

focusInputWhenWIndowFocus();

watch(
  () => inputValue.value,
  (val) => {
    setInputValue(val);
  },
);

watch(
  () => musicStore.lyricIndex,
  () => {
    focusInput();
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

  return getWordWidth(word);
}

function answerError() {
  function handleAnswerError() {
    playErrorSound();
  }

  return {
    handleAnswerError,
  };
}

function handleAnswerRight() {
  playRightSound();

  if (musicStore.isAllDone()) {
    blurInput(); // 失去输入焦点，防止结束时光标仍然在输入框，造成后续结算面板回车事件无法触发
    showSummary();
  }
  musicStore.toNextLyric();
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
    playMusic();
    return;
  }

  handleKeyboardInput(e, {
    useSpaceSubmitAnswer: {
      enable: isUseSpaceSubmitAnswer(),
      rightCallback: handleAnswerRight,
      errorCallback: handleAnswerError,
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
