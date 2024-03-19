<template>
  <div class="text-center pt-2">
    <div class="flex relative flex-wrap justify-center gap-2 transition-all">
      <template v-for="(w, i) in courseStore.words" :key="i">
        <div
          class="h-[4.8rem] border-solid rounded-[2px] border-b-2 text-[3.2em] transition-all"
          :class="[
            userInputWords[i]['isActive'] && focusing
              ? 'text-fuchsia-500 border-b-fuchsia-500'
              : userInputWords[i]?.['incorrect'] && focusing
                ? 'text-red-500 border-b-red-500'
                : 'text-[#20202099] border-b-gray-300 dark:text-gray-300 dark:border-b-gray-400',
            isShowWordsWidth() ? '' : 'min-w-28',
          ]"
          :style="isShowWordsWidth() ? { minWidth: `${inputWidth(w)}ch` } : {}"
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
        @focus="handleInputFocus"
        @blur="handleBlur"
        autoFocus
      />
    </div>
    <div class="mt-12 text-xl dark:text-gray-50">
      {{
        courseStore.currentStatement?.chinese || "生存还是毁灭，这是一个问题"
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useGameMode } from "~/composables/main/game";
import { useInput } from "~/composables/main/question";
import { useSpaceSubmitAnswer } from "~/composables/user/submitKey";
import { useShowWordsWidth } from "~/composables/user/words";
import { useCourseStore } from "~/store/course";

const courseStore = useCourseStore();
const inputEl = ref<HTMLInputElement>();
const { setInputCursorPosition, getInputCursorPosition } = useCursor();
const { focusing, handleInputFocus, handleBlur } = useFocus();
const { showAnswer } = useGameMode();
const { isShowWordsWidth } = useShowWordsWidth();
const { isUseSpaceSubmitAnswer } = useSpaceSubmitAnswer();

const {
  inputValue,
  userInputWords,
  submitAnswer,
  setInputValue,
  handleKeyboardInput,
} = useInput({
  source: () => courseStore.currentStatement?.english!,
  setInputCursorPosition,
  getInputCursorPosition,
});

watch(
  () => inputValue.value,
  (val) => {
    setInputValue(val);
  }
);

// 输入宽度
function inputWidth(word: string) {
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

function handleKeydown(e: KeyboardEvent) {
  if (e.code === "Enter") {
    e.stopPropagation();
    submitAnswer(() => {
      showAnswer();
    });
    return;
  }

  handleKeyboardInput(e, {
    useSpaceSubmitAnswer: {
      enable: isUseSpaceSubmitAnswer(),
      callback: showAnswer,
    },
  });
}

function useCursor() {
  function setInputCursorPosition(position: number) {
    inputEl.value?.setSelectionRange(position, position);
  }

  function getInputCursorPosition() {
    return inputEl.value?.selectionStart || 0;
  }

  return {
    setInputCursorPosition,
    getInputCursorPosition,
  };
}

function useFocus() {
  const focusing = ref(true);

  onMounted(() => {
    inputEl.value?.focus();
  });

  function handleInputFocus() {
    focusing.value = true;
  }

  function handleBlur() {
    focusing.value = false;
  }

  return {
    focusing,
    handleInputFocus,
    handleBlur,
  };
}
</script>
