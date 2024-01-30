<template>
  <div class="text-center pt-2">
    <div class="flex relative flex-wrap justify-center ml-2 transition-all">
      <template v-for="i in courseStore.wordCount" :key="i">
        <div
          class="flex items-end justify-center h-[4.2rem] min-w-20 px-4 mr-2 border-solid rounded-[2px] border-b-2 text-[3.2em] transition-all"
          :class="[
            i - 1 === activeInputIndex && focusing ? 'text-fuchsia-500 border-b-fuchsia-500' : 'text-[#20202099] border-b-gray-300 dark:text-gray-300 dark:border-b-gray-400',
          ]">
          {{ userInputWords[i - 1] }}
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
      {{ courseStore.currentStatement?.chinese || '生存还是毁灭，这是一个问题' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from '~/store/course';
import { useGameMode } from '~/composables/main/game';

const courseStore = useCourseStore();
const { userInputWords, activeInputIndex, inputValue } = useInput();
const { handleKeyup, handleKeydown } = registerShortcutKeyForInputEl();
const { inputEl, focusing, handleInputFocus, handleBlur } = useFocus();

function useInput() {
  const inputValue = ref('');

  const userInputWords = computed(() => {
    return inputValue.value.trimStart().split(' ');
  });

  const activeInputIndex = computed(() => {
    return Math.min(userInputWords.value.length - 1, courseStore.wordCount - 1);
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
    if (e.code === 'Enter') {
      e.stopPropagation();

      if (courseStore.checkCorrect(inputValue.value.trim())) {
        showAnswer();
      }
      inputValue.value = '';
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    const inputLastStr = inputValue.value[inputValue.value.length - 1]
    if (e.code === 'Space' && inputLastStr === ' ') {
      // prevent input multiple spaces
      e.preventDefault()
    }
    if (e.code === 'Backspace' && userInputWords.value.length - courseStore.wordCount === 1 && inputLastStr === ' ') {
      // remove the last space and the last letter
      e.preventDefault()
      inputValue.value = inputValue.value.slice(0, -2)
    }
  }

  return {
    handleKeyup,
    handleKeydown
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
