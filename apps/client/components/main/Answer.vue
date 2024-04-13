<template>
  <div class="text-center">
    <div class="ml-8 text-5xl text-fuchsia-500 dark:text-gray-50">
      {{ courseStore.currentStatement?.english }}
      <svg
        class="inline-block ml-1 cursor-pointer w-7 h-7 fill-gray-500 hover:fill-fuchsia-500"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        @click="handlePlaySound"
      >
        <path
          d="M342.4 384H128v256h214.4L576 826.8V197.2L342.4 384zM64 320h256L640 64v896L320 704H64V320z m640 256h256v-64H704v64z m16.8 159.5l181 181 45.3-45.3-181-181-45.3 45.3z m33.9-343.9l181-181-45.3-45.3-181 181 45.3 45.3z"
        ></path>
      </svg>
    </div>
    <div class="my-6 text-xl text-gray-500">
      {{ courseStore.currentStatement?.soundmark }}
    </div>
    <div class="my-6 text-xl text-gray-500">
      {{ courseStore.currentStatement?.chinese }}
    </div>
    <button
      class="btn btn-sm btn-outline hover:bg-fuchsia-500 hover:text-white"
      @click="showQuestion"
    >
      再来一次
    </button>
    <button
      class="ml-6 btn btn-sm btn-outline hover:bg-fuchsia-500 hover:text-white"
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
