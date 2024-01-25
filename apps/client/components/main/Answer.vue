<template>
  <div class="text-center mb-20 mt-10">
    <div class="text-5xl mb-3 text-fuchsia-500 dark:text-gray-50">
      {{ courseStore.currentStatement?.english }}
      <svg class="w-7 h-7 inline-block ml-1 cursor-pointer" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" @click="handlePlaySound">
        <path
          d="M342.4 384H128v256h214.4L576 826.8V197.2L342.4 384zM64 320h256L640 64v896L320 704H64V320z m640 256h256v-64H704v64z m16.8 159.5l181 181 45.3-45.3-181-181-45.3 45.3z m33.9-343.9l181-181-45.3-45.3-181 181 45.3 45.3z"
          fill="#666666"></path>
      </svg>
    </div>
    <div class="text-2xl text-slate-600">
      {{ courseStore.currentStatement?.soundmark }}
    </div>
    <button
      class="border-solid border-2 border-slate-400 bg-slate-100 dark:bg-fuchsia-500 rounded-lg mt-8 mb-11 indent-1 h-10 text-2xl pl-10 pr-10 hover:bg-slate-200"
      @click="goToNextQuestion">
      next
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from "~/store/course";
import { registerShortcut, cancelShortcut } from "~/utils/keyboardShortcuts";
import { useGameMode } from "~/composables/main/game";
import { useSummary } from "~/composables/main/summary";
import { useCurrentStatementEnglishSound } from '~/composables/main/englishSound';

const courseStore = useCourseStore();
registerShortcutKeyForNextQuestion();
const { handlePlaySound } = usePlayEnglishSound();

function usePlayEnglishSound() {
  const { sound } = useCurrentStatementEnglishSound();

  onMounted(() => {
    sound.play();
  });

  function handlePlaySound() {
    sound.play();
  }

  return {
    handlePlaySound,
  };
}

function registerShortcutKeyForNextQuestion() {
  function handleKeydown() {
    goToNextQuestion();
  }
  onMounted(() => {
    registerShortcut("enter", handleKeydown);
  });

  onUnmounted(() => {
    cancelShortcut("enter", handleKeydown);
  });
}

function goToNextQuestion() {
  const { showQuestion } = useGameMode();
  const { showSummary } = useSummary();

  if (courseStore.isAllDone()) {
    showSummary();
    return;
  }

  courseStore.toNextStatement();
  showQuestion();
}
</script>