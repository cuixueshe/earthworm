<template>
  <template v-if="currentGameMode === GameMode.Dictation">
    <ModeDictationMode />
  </template>
  <template v-else-if="currentGameMode === GameMode.ChineseToEnglish">
    <ModeChineseToEnglishMode />
  </template>

  <MainTips />
  <MainSummary />
  <MainShare />
  <MainAuthRequired />

  <div class="absolute left-0 top-24">{{ onlineUserCount }}人正在学习</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

import { courseTimer } from "~/composables/courses/courseTimer";
import { useOnline } from "~/composables/main/onlineUsers";
import { GameMode, useGameMode } from "~/composables/user/gameMode";

const { currentGameMode } = useGameMode();
const { onlineUserCount, watchOnlineUsers, leaveGame } = useOnline();

onMounted(() => {
  courseTimer.reset();
  watchOnlineUsers();
});

onUnmounted(() => leaveGame());
</script>
