<template>
  <UModal
    v-model="showGamePauseModal"
    @close="handleClose"
    :ui="{ width: 'w-full sm:max-w-lg' }"
  >
    <div class="flex h-52 flex-col justify-between p-6 text-gray-900 dark:text-white">
      <h2 class="mb-8 text-2xl font-bold">游戏暂停</h2>
      <p class="mb-8 max-w-sm text-base text-gray-700 dark:text-gray-300">
        {{ randomMessage }}
      </p>
      <div class="flex w-full justify-end">
        <UButton
          class="px-6"
          @click="handleClose"
        >
          继续游戏
        </UButton>
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";

import { useQuestionInput } from "~/components/main/QuestionInput/questionInputHelper";
import { useGamePause } from "~/composables/main/useGamePause";
import { useShortcutKeyMode } from "~/composables/user/shortcutKey";
import { useGameStore } from "~/store/game";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

const gameStore = useGameStore();
const { showGamePauseModal, resumeGame, pauseGame } = useGamePause();
const { shortcutKeys } = useShortcutKeyMode();
const { focusInput } = useQuestionInput();

const messages = [
  "别忘了回来继续练习哦，我在等着你呢！",
  "休息一下没关系，但别让我等太久！",
  "快点回来吧，你的英语能力正在蓄势待发！",
];

const randomMessage = ref("");
watch(
  showGamePauseModal,
  (newValue) => {
    if (newValue) {
      randomMessage.value = messages[Math.floor(Math.random() * messages.length)];
    }
  },
  {
    immediate: true,
  },
);

function handleClose() {
  resumeGame();
  setTimeout(() => {
    focusInput();
  }, 300);
}

function handleGamePause(e: KeyboardEvent) {
  e.preventDefault();
  if (gameStore.isGamePaused()) {
    resumeGame();
    setTimeout(() => {
      focusInput();
    }, 300);
  } else {
    pauseGame();
  }
}

onMounted(() => {
  registerShortcut(shortcutKeys.value.pause, handleGamePause);
});

onUnmounted(() => {
  cancelShortcut(shortcutKeys.value.pause, handleGamePause);
});
</script>
