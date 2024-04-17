<template>
  <div class="absolute flex w-full items-center justify-between">
    <!-- left arrow button: go to previous question -->
    <div class="h-12 w-12">
      <button
        class="arrow-btn tooltip"
        :data-tip="PREV_BTN_TIP"
        @click="goToPreviousQuestion"
        v-show="courseStore.statementIndex !== 0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3em"
          height="3em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="m15 5l-6 7l6 7"
          />
        </svg>
      </button>
    </div>
    <!-- right arrow button: go to next question -->
    <div class="h-12 w-12">
      <button
        class="arrow-btn tooltip"
        @click="goToNextQuestion"
        :data-tip="NEXT_BTN_TIP"
        totalQuestionsCount
        v-show="courseStore.statementIndex + 1 !== courseStore.totalQuestionsCount"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3em"
          height="3em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="m9 5l6 7l-6 7"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

import { useGameMode } from "~/composables/main/game";
import { useShortcutKeyMode } from "~/composables/user/shortcutKey";
import { useCourseStore } from "~/store/course";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

const { shortcutKeys } = useShortcutKeyMode();
const { goToNextQuestion, goToPreviousQuestion } = usePrevAndNextQuestion(
  shortcutKeys.value.previous,
  shortcutKeys.value.skip,
);

const PREV_BTN_TIP = `上一题（快捷键：${shortcutKeys.value.previous} ）`;
const NEXT_BTN_TIP = `下一题（快捷键：${shortcutKeys.value.skip} ）`;

const { showQuestion } = useGameMode();
const courseStore = useCourseStore();

// 上一题/下一题
function usePrevAndNextQuestion(prevKey: string, nextKey: string) {
  handleShortcut();

  function goToNextQuestion() {
    courseStore.toNextStatement();
    showQuestion();
  }

  function goToPreviousQuestion() {
    courseStore.toPreviousStatement();
    showQuestion();
  }

  function handleShortcut() {
    onMounted(() => {
      registerShortcut(prevKey, goToPreviousQuestion);
      registerShortcut(nextKey, goToNextQuestion);
    });

    onUnmounted(() => {
      cancelShortcut(prevKey, goToPreviousQuestion);
      cancelShortcut(nextKey, goToNextQuestion);
    });
  }

  return {
    goToNextQuestion,
    goToPreviousQuestion,
  };
}
</script>
<style scoped>
.arrow-btn {
  @apply text-[#475569] hover:text-[#d946ef] dark:text-[#cbd5e1] dark:hover:text-[#d946ef];
  @apply transition-transform duration-150 ease-in-out;
}
.arrow-btn:active {
  @apply scale-95;
}
</style>
