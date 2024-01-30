<template>
  <div class="absolute left-0 right-0 bottom-[16vh] flex flex-col items-center">
    <div class="w-[210px] mb-4">
      <button class="tip-btn" @click="playSound">⌃ Ctrl+;</button>
      <span class="ml-2">play sound</span>
    </div>
    <div class="w-[210px]">
      <button class="tip-btn" @click="toggleGameMode">⌃ Ctrl+'</button>
      <span class="ml-2">{{ toggleTipText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameMode } from "~/composables/main/game";
import { registerShortcut, cancelShortcut } from "~/utils/keyboardShortcuts";
import { useCurrentStatementEnglishSound } from "~/composables/main/englishSound";
import { useSummary } from "~/composables/main/summary";

const { playSound } = usePlaySound();
const { toggleGameMode } = useShowAnswer();

const toggleTipText = computed(() => {
  const { isAnswer } = useGameMode();
  return isAnswer() ? "again" : "show answer";
});

function usePlaySound() {
  const { playSound } = useCurrentStatementEnglishSound();

  onMounted(() => {
    registerShortcut("ctrl+;", playSoundCommand);
  });

  onUnmounted(() => {
    cancelShortcut("ctrl+;", playSoundCommand);
  });

  function playSoundCommand(e: KeyboardEvent) {
    e.preventDefault();
    playSound();
  }

  return {
    playSound,
  };
}

function useShowAnswer() {
  const { showAnswer, showQuestion } = useGameMode();

  onMounted(() => {
    registerShortcut("ctrl+'", handleShowAnswer);
  });

  onUnmounted(() => {
    cancelShortcut("ctrl+'", handleShowAnswer);
  });

  function handleShowAnswer(e: KeyboardEvent) {
    e.preventDefault();
    toggleGameMode();
  }

  function toggleGameMode() {
    // NOTE: registerShortcut 事件会记住注册时的面板状态，所以这里要重新获取下面板信息
    const { isAnswer } = useGameMode();
    const { showModal } = useSummary();
    if (showModal.value) {
      // 结算面板不做切换处理
      return;
    }
    if (isAnswer()) {
      showQuestion();
    } else {
      showAnswer();
    }
  }

  return {
    toggleGameMode
  };
}
</script>

<style scoped>
.tip-btn {
  @apply btn btn-xs text-gray-500 bg-gray-100 hover:text-gray-100 hover:bg-gray-500 dark:text-white dark:bg-gray-500 dark:hover:text-white dark:hover:bg-fuchsia-500;
}
</style>
