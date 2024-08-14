<template>
  <div class="absolute flex w-full items-center justify-between">
    <div class="h-12 w-12">
      <button
        v-show="courseStore.visibleStatementIndex !== 0"
        class="arrow-btn"
        @click="goToPreviousQuestion"
      >
        <UTooltip
          text="上一题"
          :shortcuts="parseShortcut(shortcutKeys.previous)"
        >
          <UIcon
            name="i-ph-caret-left"
            class="h-12 w-12"
          ></UIcon>
        </UTooltip>
      </button>
    </div>

    <div class="h-12 w-12">
      <button
        v-show="courseStore.visibleStatementIndex + 1 !== courseStore.visibleStatementsCount"
        class="arrow-btn"
        @click="goToNextQuestion"
      >
        <UTooltip
          text="下一题"
          :shortcuts="parseShortcut(shortcutKeys.skip)"
        >
          <UIcon
            name="i-ph-caret-right"
            class="h-12 w-12"
          ></UIcon>
        </UTooltip>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

import { useGameMode } from "~/composables/main/game";
import { parseShortcut, useShortcutKeyMode } from "~/composables/user/shortcutKey";
import { useCourseStore } from "~/store/course";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

const { shortcutKeys } = useShortcutKeyMode();
const { goToNextQuestion, goToPreviousQuestion } = usePrevAndNextQuestion(
  shortcutKeys.value.previous,
  shortcutKeys.value.skip,
);

const PREV_BTN_TIP = `上一题 (${shortcutKeys.value.previous})`;
const NEXT_BTN_TIP = `下一题 (${shortcutKeys.value.skip})`;

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
