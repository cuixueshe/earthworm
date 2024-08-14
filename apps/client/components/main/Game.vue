<template>
  <template v-if="currentGameMode === GameMode.Dictation">
    <ModeDictationMode />
  </template>
  <template v-else-if="currentGameMode === GameMode.ChineseToEnglish">
    <ModeChineseToEnglishMode />
  </template>

  <MainLearningTimer v-if="isAuthenticated()"></MainLearningTimer>
  <MainTips />
  <MainSummary />
  <MainShare />
  <GamePauseModal v-if="isAuthenticated()"></GamePauseModal>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

import GamePauseModal from "~/components/main/GamePauseModal.vue";
import { courseTimer } from "~/composables/courses/courseTimer";
import { GameMode, useGameMode } from "~/composables/user/gameMode";
import { isAuthenticated } from "~/services/auth";
import { useGameStore } from "~/store/game";

const { currentGameMode } = useGameMode();
const gameStore = useGameStore();

onMounted(() => {
  courseTimer.reset();
  gameStore.startGame();
});

onUnmounted(() => {
  gameStore.exitGame();
});
</script>
