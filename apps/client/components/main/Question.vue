<template>
  <div class="text-center pt-2">
    <div class="flex relative flex-wrap justify-center gap-2 transition-all">
      <template v-for="(w, i) in courseStore.words" :key="i">
        <div
          class="h-[4.8rem] border-solid rounded-[2px] border-b-2 text-[3.2em] transition-all"
          :class="[
            i === activeInputIndex && focusing
              ? 'text-fuchsia-500 border-b-fuchsia-500'
              : 'text-[#20202099] border-b-gray-300 dark:text-gray-300 dark:border-b-gray-400',
          ]"
          :style="{ width: `${w.length}ch` }"
        >
          {{ userInputWords[i] }}
        </div>
      </template>
      <input ref="inputEl" class="absolute h-full w-full opacity-0" type="text" v-model="inputValue" @keyup="handleKeyup"
        @keydown="handleKeydown" @focus="handleInputFocus" @blur="handleBlur" autoFocus />
    </div>
    <div class="mt-12 text-xl dark:text-gray-50">
      {{
        courseStore.currentStatement?.chinese || "生存还是毁灭，这是一个问题"
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from "~/store/course";
import { useGameMode } from "~/composables/main/game";
import { ref, computed, onMounted } from "vue";

const courseStore = useCourseStore();
const { userInputWords, activeInputIndex, inputValue } = useInput();
const { handleKeyup, handleKeydown } = registerShortcutKeyForInputEl();
const { inputEl, focusing, handleInputFocus, handleBlur } = useFocus();

function useInput() {
  const inputValue = ref("");

  const userInputWords = computed(() => {
    return inputValue.value.trimStart().split(" ");
  });

  const activeInputIndex = computed(() => {
    return Math.min(userInputWords.value.length - 1, courseStore.words.length - 1);
  });

  return {
    inputValue,
    userInputWords,
    activeInputIndex,
  };
}

function registerShortcutKeyForInputEl() {
  const { showAnswer } = useGameMode();

  function handleKeyup(e: KeyboardEvent) {
    if (e.code === "Enter") {
      e.stopPropagation();

      if (courseStore.checkCorrect(inputValue.value.trim())) {
        showAnswer();
      }
      inputValue.value = "";
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    const inputLastStr = inputValue.value[inputValue.value.length - 1];
    if (e.code === "Space" && inputLastStr === " ") {
      // prevent input multiple spaces
      e.preventDefault();
    }
    if (
      e.code === "Backspace" &&
      userInputWords.value.length - courseStore.words.length === 1 &&
      inputLastStr === " "
    ) {
      // remove the last space and the last letter
      e.preventDefault();
      inputValue.value = inputValue.value.slice(0, -2);
    }
    // 新增逻辑：阻止在最后一个单词后添加空格
    const words = inputValue.value.trim().split(" ");
    const isLastWord = words.length === courseStore.wordCount;
    if (e.code === "Space" && isLastWord) {
      e.preventDefault();
    }
  }

  return {
    handleKeyup,
    handleKeydown,
  };
}

function useFocus() {
  const focusing = ref(true);
  const inputEl = ref<HTMLInputElement>();
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
    inputEl,
    focusing,
    handleInputFocus,
    handleBlur,
  };
}
</script>
