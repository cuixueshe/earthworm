<template>
  <div class="flex items-center font-sans text-gray-300 dark:text-gray-500">
    <div
      ref="clockIcon"
      class="mr-1 flex items-center justify-center"
    >
      <UIcon
        name="i-ph-alarm-bold"
        class="h-8 w-8"
      ></UIcon>
    </div>
    <p class="text-lg font-bold">{{ formattedTime }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

import { useLearningTimeTracker } from "~/composables/main/learningTimeTracker";
import { useGamePause } from "~/composables/main/useGamePause";
import { useGameStore } from "~/store/game";

const { $anime } = useNuxtApp();
const gameStore = useGameStore();

const { pauseGame, enableAutoPauseCheck, disableAutoPauseCheck } = useGamePause();

const { totalSeconds, stopTracking } = useLearningTimeTracker();
const clockIcon = ref(null);

const formattedTime = computed(() => {
  const hours = Math.floor(totalSeconds.value / 3600);
  const minutes = Math.floor((totalSeconds.value % 3600) / 60);
  const seconds = totalSeconds.value % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
});

function animateClock() {
  $anime({
    targets: clockIcon.value,
    translateY: [
      { value: -4, duration: 100, easing: "easeInOutQuad" },
      { value: 4, duration: 200, easing: "easeInOutQuad" },
      { value: -4, duration: 200, easing: "easeInOutQuad" },
      { value: 4, duration: 200, easing: "easeInOutQuad" },
      { value: 0, duration: 100, easing: "easeInOutQuad" },
    ],
    rotate: [
      { value: -5, duration: 100, easing: "easeInOutQuad" },
      { value: 5, duration: 200, easing: "easeInOutQuad" },
      { value: -5, duration: 200, easing: "easeInOutQuad" },
      { value: 5, duration: 200, easing: "easeInOutQuad" },
      { value: 0, duration: 100, easing: "easeInOutQuad" },
    ],
    scale: [
      { value: 1.1, duration: 400, easing: "easeInOutQuad" },
      { value: 1, duration: 400, easing: "easeInOutQuad" },
    ],
    duration: 800,
    loop: 1,
  });
}

watch(totalSeconds, (newValue) => {
  if (newValue % 60 === 0 && newValue !== 0) {
    animateClock();
  }
});

function handleVisibilityChange() {
  if (gameStore.isGamePaused()) {
    return;
  }

  if (document.hidden) {
    stopTracking();
    pauseGame();
  }
}

function handleBeforeunload() {
  if (gameStore.isGamePaused()) {
    return;
  }

  stopTracking();
}

onMounted(() => {
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("beforeunload", handleBeforeunload);
  enableAutoPauseCheck();
});

onUnmounted(() => {
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  window.removeEventListener("beforeunload", handleBeforeunload);
  disableAutoPauseCheck();
});
</script>
