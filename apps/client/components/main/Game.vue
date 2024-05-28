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
  <!-- TODO: 暂时先不提示（有些用户正在移动端的场景下使用）-->
  <!-- <MainMessageBox
    v-model:show-modal="isMessageShow"
    cancel-btn-text="确定"
    :content="messageContent"
  /> -->
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { courseTimer } from "~/composables/courses/courseTimer";
// import { useDeviceTip } from "~/composables/main/game";
import { GameMode, useGameMode } from "~/composables/user/gameMode";

// const { isMessageShow, messageContent } = useDeviceTip();
const { currentGameMode } = useGameMode();

onMounted(() => {
  courseTimer.reset();
});
</script>
