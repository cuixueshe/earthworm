<template>
  <div class="text-center">
    <div class="ml-8 text-5xl text-fuchsia-500 dark:text-gray-50">
      {{ courseStore.currentStatement?.english }}
      <svg
<<<<<<< Updated upstream
        class="inline-block ml-1 cursor-pointer w-7 h-7 fill-gray-500 hover:fill-fuchsia-500"
=======
        class="inline-block ml-1 cursor-pointer w-7 h-7"
>>>>>>> Stashed changes
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        @click="handlePlaySound"
      >
        <path
          d="M342.4 384H128v256h214.4L576 826.8V197.2L342.4 384zM64 320h256L640 64v896L320 704H64V320z m640 256h256v-64H704v64z m16.8 159.5l181 181 45.3-45.3-181-181-45.3 45.3z m33.9-343.9l181-181-45.3-45.3-181 181 45.3 45.3z"
<<<<<<< Updated upstream
=======
          fill="#666666"
>>>>>>> Stashed changes
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
      class="btn btn-sm btn-outline"
      @click="showQuestion"
    >
      再来一次
    </button>
    <button
      class="ml-6 btn btn-sm btn-outline"
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
<<<<<<< Updated upstream
import { useAutoPronunciation } from "~/composables/user/sound";
import { useCourseStore } from "~/store/course";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";
=======
import { useAutoSound } from "~/composables/user/sound";
import { useCalendarStore } from "~/store/calendar";
>>>>>>> Stashed changes

const courseStore = useCourseStore();
const { handlePlaySound } = usePlayEnglishSound();
const { showSummary } = useSummary();
const { showQuestion } = useGameMode();
<<<<<<< Updated upstream
const { isAutoPlaySound } = useAutoPronunciation();

registerShortcutKeyForNextQuestion();
=======
const { isAutoPlaySound } = useAutoSound();
>>>>>>> Stashed changes

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
  if (courseStore.isAllDone() || true) {
    // 奉新当前日历
    const calendarStore = useCalendarStore();
    const date = new Date();
    calendarStore.updateCalendarInfo(
      `${date.getFullYear()}-${
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1
      }-${date.getDate()}`
    );
    showSummary();
    return;
  }

  courseStore.toNextStatement();
  showQuestion();
}
</script>
