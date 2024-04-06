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
  <MessageBox
    :content="messageContent"
    v-model:isShowModal="isMessageShow"
    cancel-btn-text="确定"
    confirmBtnText=""
  ></MessageBox>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { courseTimer } from "~/composables/courses/courseTimer";
import { useMessageTip } from "~/composables/main/game";
import { GameMode, useGameMode } from "~/composables/user/gameMode";
import MessageBox from "./MessageBox/MessageBox.vue";

const { isMessageShow, messageContent } = useMessageTip();

const { currentGameMode } = useGameMode();
console.log(2222);

onMounted(() => {
  courseTimer.reset();
});
</script>
