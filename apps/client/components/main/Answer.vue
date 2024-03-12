<template>
  <div class="text-center">
    <div class="ml-8 text-5xl text-fuchsia-500 dark:text-gray-50">
      {{ courseStore.currentStatement?.english }}
      <svg
        class="inline-block ml-1 cursor-pointer w-7 h-7"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        v-show="!audioPlaying"
        @click="handlePlaySound"
      >
        <path
          d="M511.7 862a30 30 0 0 1-18-6L246.4 670.21h-148a30 30 0 0 1-30-30V384a30 30 0 0 1 30-30h148.3l247-186a30 30 0 0 1 48.05 24v640a30 30 0 0 1-30 30zM128.37 610.21h128a30 30 0 0 1 18 6l207.33 155.7V252.18L274.75 408a30 30 0 0 1-18.05 6H128.37z"
          fill="#666666"
        ></path>
      </svg>
      <svg
        class="inline-block ml-1 cursor-pointer w-7 h-7"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        v-show="audioPlaying"
      >
        <path
          d="M625.9 115c-5.9 0-11.9 1.6-17.4 5.3L254 352H90c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h164l354.5 231.7c5.5 3.6 11.6 5.3 17.4 5.3 16.7 0 32.1-13.3 32.1-32.1V147.1c0-18.8-15.4-32.1-32.1-32.1zM586 803L293.4 611.7l-18-11.7H146V424h129.4l17.9-11.7L586 221v582z m348-327H806c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16h128c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16z m-41.9 261.8l-110.3-63.7a15.9 15.9 0 0 0-21.7 5.9l-19.9 34.5c-4.4 7.6-1.8 17.4 5.8 21.8L856.3 800a15.9 15.9 0 0 0 21.7-5.9l19.9-34.5c4.4-7.6 1.7-17.4-5.8-21.8zM760 344a15.9 15.9 0 0 0 21.7 5.9L892 286.2c7.6-4.4 10.2-14.2 5.8-21.8L878 230a15.9 15.9 0 0 0-21.7-5.9L746 287.8a15.99 15.99 0 0 0-5.8 21.8L760 344z"
          fill="#666666"
        ></path>
      </svg>
    </div>
    <div class="my-6 text-xl text-gray-500">
      {{ courseStore.currentStatement?.soundmark }}
    </div>
    <button class="btn-item" @click="showQuestion">again</button>
    <button class="ml-5 btn-item" @click="goToNextQuestion">next</button>
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from "~/store/course";
import { registerShortcut, cancelShortcut } from "~/utils/keyboardShortcuts";
import { useGameMode } from "~/composables/main/game";
import { useCurrentStatementEnglishSound } from "~/composables/main/englishSound";
import { onMounted, onUnmounted } from "vue";
import { useSummary } from "~/composables/main/summary";
import { useAutoSound } from "~/composables/user/sound";

const courseStore = useCourseStore();
registerShortcutKeyForNextQuestion();
const { handlePlaySound, audioPlaying } = usePlayEnglishSound();
const { showSummary } = useSummary();
const { showQuestion } = useGameMode();
const { isAutoPlaySound } = useAutoSound();

function usePlayEnglishSound() {
  const { playSound, audioPlaying } = useCurrentStatementEnglishSound();

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
    audioPlaying,
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
  if (courseStore.isAllDone()) {
    showSummary();
    return;
  }

  courseStore.toNextStatement();
  showQuestion();
}
</script>

<style scoped>
.btn-item {
  @apply btn btn-sm text-xl text-gray-500 bg-gray-100 hover:text-gray-100 hover:bg-gray-500 dark:text-white dark:bg-gray-500 dark:hover:text-white dark:hover:bg-fuchsia-500 shadow-md;
}
</style>
