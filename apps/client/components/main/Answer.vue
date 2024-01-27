<template>
  <div class="text-center">
    <div class="ml-8 text-5xl text-fuchsia-500 dark:text-gray-50">
      {{ courseStore.currentStatement?.english }}
      <svg class="w-7 h-7 inline-block ml-1 cursor-pointer" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" @click="handlePlaySound">
        <path
          d="M342.4 384H128v256h214.4L576 826.8V197.2L342.4 384zM64 320h256L640 64v896L320 704H64V320z m640 256h256v-64H704v64z m16.8 159.5l181 181 45.3-45.3-181-181-45.3 45.3z m33.9-343.9l181-181-45.3-45.3-181 181 45.3 45.3z"
          fill="#666666"></path>
      </svg>
    </div>
    <div class="my-6 text-xl text-gray-500">
      {{ courseStore.currentStatement?.soundmark }}
    </div>
    <button class="
          btn
          btn-sm
          text-xl
          text-gray-500
          bg-gray-100
          hover:text-gray-100
          hover:bg-gray-500
          dark:text-white 
          dark:bg-gray-500
          dark:hover:text-white
          dark:hover:bg-fuchsia-500
          shadow-md" @click="goToNextQuestion">
      next
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from "~/store/course";
import { registerShortcut, cancelShortcut } from "~/utils/keyboardShortcuts";
import { useGameMode } from "~/composables/main/game";
import { useCurrentStatementEnglishSound } from '~/composables/main/englishSound';

const courseStore = useCourseStore();
registerShortcutKeyForNextQuestion();
const { handlePlaySound } = usePlayEnglishSound();

function usePlayEnglishSound() {
  const { playSound } = useCurrentStatementEnglishSound();

  onMounted(() => {
    playSound()
  });

  function handlePlaySound() {
    playSound()
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
  const { showQuestion, showSummary } = useGameMode();

  if (courseStore.isAllDone()) {
    showSummary();
    return;
  }

  courseStore.toNextStatement();
  showQuestion();
}
</script>
