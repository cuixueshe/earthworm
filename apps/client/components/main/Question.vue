<template>
  <div class="text-center pt-2">
    <div class="flex relative flex-wrap justify-center gap-2 transition-all">
      <template v-for="(w, i) in courseStore.words" :key="i">
        <div
          class="h-[4.8rem] border-solid rounded-[2px] border-b-2 text-[3.2em] transition-all"
          :class="[
            userInputWords[i]['incorrect']
              ? 'text-red-500 border-b-red-500'
              : userInputWords[i]?.['isActive'] && focusing
                ? 'text-fuchsia-500 border-b-fuchsia-500'
                : 'text-[#20202099] border-b-gray-300 dark:text-gray-300 dark:border-b-gray-400',
          ]"
          :style="{ width: `${w.length}ch` }"
        >
          {{ userInputWords[i]["userInput"] }}
        </div>
      </template>
      <input
        ref="inputEl"
        class="absolute h-full w-full opacity-0"
        type="text"
        v-model="inputValue"
        @keyup="handleKeyup"
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
import { useCourseStore } from "~/store/course";
import { useGameMode } from "~/composables/main/game";
import { ref, onMounted, watch } from "vue";
import { useInput } from "~/composables/main/question";

const courseStore = useCourseStore();
const inputEl = ref<HTMLInputElement>();
const { setInputCursorPosition, getInputCursorPosition } = useCursor();
const { focusing, handleInputFocus, handleBlur } = useFocus();
const { showAnswer } = useGameMode();

const {
  inputValue,
  userInputWords,
  preventInput,
  submitAnswer,
  setInputValue,
  fixIncorrectWord,
  fixFirstIncorrectWord,
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

function handleKeyup(e: KeyboardEvent) {
  if (e.code === "Enter") {
    e.stopPropagation();
    submitAnswer(() => {
      showAnswer();
    });
  } else if (e.code === "Backspace") {
    fixFirstIncorrectWord();
  } else if (e.code === "Space") {
    fixIncorrectWord();
  }
}

function handleKeydown(e: KeyboardEvent) {
  preventInput(e);
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
