<template>
  <div class="text-center">
    <div class="ml-8 text-5xl text-fuchsia-500 dark:text-gray-50">
      {{ courseStore.currentStatement?.english }}
      <i
        class="i-ph-speaker-simple-high ml-1 inline-block h-7 w-7 cursor-pointer text-gray-500 hover:text-fuchsia-500"
        @click="handlePlaySound"
      ></i>
    </div>
    <div class="my-6 text-xl text-gray-500">
      {{ courseStore.currentStatement?.soundmark }}
    </div>
    <div class="my-6 text-xl text-gray-500">
      {{ courseStore.currentStatement?.chinese }}
    </div>
    <button
      class="btn btn-outline btn-sm"
      @click="showQuestion"
    >
      再来一次
    </button>
    <button
      class="btn btn-outline btn-sm ml-6"
      @click="goToNextQuestion"
    >
      下一题
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

import { useCurrentStatementEnglishSound } from "~/composables/main/englishSound";
import { useGameMode } from "~/composables/main/game";
import { useSummary } from "~/composables/main/summary";
import { useAutoPronunciation } from "~/composables/user/sound";
import { useCourseStore } from "~/store/course";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

const courseStore = useCourseStore();
const { handlePlaySound } = usePlayEnglishSound();
const { showSummary } = useSummary();
const { showQuestion } = useGameMode();
const { isAutoPlaySound } = useAutoPronunciation();

registerShortcutKeyForNextQuestion();

function usePlayEnglishSound() {
  const { playSound } = useCurrentStatementEnglishSound();

  onMounted(() => {
    if (isAutoPlaySound()) {
      playSound();
    }
  });

  function handlePlaySound() {
    playSound();
  }

  return {
    handlePlaySound,
  };
}

function registerShortcutKeyForNextQuestion() {
  function handleKeydown(e: KeyboardEvent) {
    e.preventDefault(); // 阻止到下一个页面的默认按键动作
    goToNextQuestion();
  }
  onMounted(() => {
    registerShortcut(" ", handleKeydown);
    registerShortcut("enter", handleKeydown);
  });

  onUnmounted(() => {
    cancelShortcut(" ", handleKeydown);
    cancelShortcut("enter", handleKeydown);
  });
}

function goToNextQuestion() {
  if (courseStore.isAllDone()) {
    showSummary();
    return;
  }

  courseStore.toNextStatement();
  showQuestion();
}
</script>
