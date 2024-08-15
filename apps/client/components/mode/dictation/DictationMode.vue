<template>
  <div class="flex h-full items-center justify-center">
    <div v-if="!isStart">
      <button
        class="btn"
        v-if="isMobile"
        @click="startGame"
      >
        准备好了吗？ 点我开始
      </button>
      <p v-else>准备好了吗？(按任意键开启游戏)</p>
    </div>
    <div v-else>
      <template v-if="isQuestion()">
        <ModeDictationQuestion />
        <MainAnswerTip v-show="isAnswerTip()" />
      </template>
      <template v-else-if="isAnswer()">
        <MainAnswer />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useAnswerTip } from "~/composables/main/answerTip";
import { useGameMode } from "~/composables/main/game";
import { useDevice } from "~/utils/detectDevice";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

const { isMobile } = useDevice();
const { isAnswer, isQuestion } = useGameMode();
const { isAnswerTip } = useAnswerTip();
const { isStart, startGame } = useStartGame();

function useStartGame() {
  const isStart = ref(false);

  function handleKeyup(e: KeyboardEvent) {
    e.preventDefault();
    startGame();
    cancelShortcut("*", handleKeyup);
  }

  onMounted(() => {
    registerShortcut("*", handleKeyup);
  });

  function startGame() {
    isStart.value = true;
  }

  return {
    isStart,
    startGame,
  };
}
</script>

<style scoped></style>
