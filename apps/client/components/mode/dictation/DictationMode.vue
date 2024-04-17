<template>
  <div class="relative flex h-full items-center justify-center">
    <div v-if="!isStart">
      <p>准备好了吗？(按任意键开启游戏)</p>
    </div>
    <div v-else>
      <ModeDictationToolbar />
      <template v-if="isQuestion()">
        <ModeDictationQuestion />
        <MainAnswerTip v-show="isAnswerTip()" />
      </template>
      <template v-else-if="isAnswer()">
        <MainAnswer />
      </template>
    </div>
  </div>
  <MainTips></MainTips>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useAnswerTip } from "~/composables/main/answerTip";
import { useGameMode } from "~/composables/main/game";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

const { isAnswer, isQuestion } = useGameMode();
const { isAnswerTip } = useAnswerTip();
const { isStart } = useStartGame();

function useStartGame() {
  const isStart = ref(false);

  function handleKeyup(e: KeyboardEvent) {
    e.preventDefault();
    isStart.value = true;
    cancelShortcut("*", handleKeyup);
  }

  onMounted(() => {
    registerShortcut("*", handleKeyup);
  });

  return {
    isStart,
  };
}
</script>

<style scoped></style>
