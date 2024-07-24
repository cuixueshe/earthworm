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
  <MainAuthRequired />
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { courseTimer } from "~/composables/courses/courseTimer";
import { GameMode, useGameMode } from "~/composables/user/gameMode";
import { isAuthenticated } from "~/services/auth";

const { currentGameMode } = useGameMode();

onMounted(() => {
  courseTimer.reset();
});
</script>
