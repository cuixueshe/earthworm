<template>
  <UModal
    v-model="showGamePauseModal"
    @close="handleClose"
    :ui="{ width: 'w-full sm:max-w-lg' }"
  >
    <div class="flex h-52 flex-col justify-between p-6 text-gray-900 dark:text-white">
      <h2 class="mb-8 text-2xl font-bold">Tạm dừng trò chơi</h2>
      <p class="mb-8 max-w-sm text-base text-gray-700 dark:text-gray-300">
        {{ randomMessage }}
      </p>
      <div class="flex w-full justify-end">
        <UButton
          class="px-6"
          @click="handleClose"
        >
          Tiếp tục
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
  "Đừng quên quay lại luyện tập nhé, mình đang đợi bạn đó!",
  "Nghỉ ngơi một chút cũng không sao, nhưng đừng để mình đợi quá lâu!",
  "Quay lại nhanh đi, khả năng tiếng Anh của bạn đang sẵn sàng bùng nổ!",
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
