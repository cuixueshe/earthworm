<template>
  <div class="absolute left-0 right-0 bottom-[16vh] flex flex-col items-center">
    <div class="w-[210px] mb-4">
      <button
        class="tip-btn"
        @click="playSound"
      >
        ⌃ {{ shortcutKeys.sound }}
      </button>
      <span class="ml-2">play sound</span>
    </div>
    <div class="w-[210px] mb-4">
      <button
        class="tip-btn"
        @click="toggleGameMode"
      >
        ⌃ {{ shortcutKeys.answer }}
      </button>
      <span class="ml-2">{{ toggleTipText }}</span>
    </div>

    <div class="w-[210px] mb-4">
      <button
        class="tip-btn"
        @click="goToNextQuestion"
      >
      ⌃ {{ shortcutKeys.skip }}
      </button>
      <span class="ml-2">skip</span>
    </div>

    <div class="w-[210px]">
      <button
        class="tip-btn"
        @click="toggleGameMode"
      >
        Space
      </button>
      <span class="ml-2">fix incorrect word</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { useAnswerTip } from "~/composables/main/answerTip";
import { useCurrentStatementEnglishSound } from "~/composables/main/englishSound";
import { useGameMode } from "~/composables/main/game";
import { useGoToNextQuestion } from "~/composables/main/goToNextQuestion";
import { useSummary } from "~/composables/main/summary";
import { useShortcutKeyMode } from "~/composables/user/shortcutKey";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

const { shortcutKeys } = useShortcutKeyMode();
const { playSound } = usePlaySound(shortcutKeys.value.sound);
const { toggleGameMode } = useShowAnswer(shortcutKeys.value.answer);
const { goToNextQuestion } = useSkip(shortcutKeys.value.skip)

const toggleTipText = computed(() => {
  let text = "";
  const { isAnswer } = useGameMode();
  const { isAnswerTip } = useAnswerTip();
  if (isAnswer()) {
    text = "again";
  } else {
    if (isAnswerTip()) {
      text = "close answer";
    } else {
      text = "show answer";
    }
  }
  return text;
});

function usePlaySound(key: string) {
  const { playSound } = useCurrentStatementEnglishSound();

  onMounted(() => {
    registerShortcut(key, playSoundCommand);
  });

  onUnmounted(() => {
    cancelShortcut(key, playSoundCommand);
  });

  function playSoundCommand(e: KeyboardEvent) {
    e.preventDefault();
    playSound();
  }

  return {
    playSound,
  };
}

function useShowAnswer(key: string) {
  const { showQuestion } = useGameMode();
  const { showAnswerTip, hiddenAnswerTip } = useAnswerTip();

  onMounted(() => {
    registerShortcut(key, handleShowAnswer);
  });

  onUnmounted(() => {
    cancelShortcut(key, handleShowAnswer);
  });

  function handleShowAnswer(e: KeyboardEvent) {
    e.preventDefault();
    toggleGameMode();
  }

  function toggleGameMode() {
    // NOTE: registerShortcut 事件会记住注册时的面板状态，所以这里要重新获取下面板信息
    const { showModal } = useSummary();
    if (showModal.value) {
      // 结算面板不做切换处理
      return;
    }

    const { isAnswer } = useGameMode();
    const { isAnswerTip } = useAnswerTip();
    if (isAnswer()) {
      showQuestion();
    } else {
      if (isAnswerTip()) {
        hiddenAnswerTip();
      } else {
        showAnswerTip();
      }
    }
  }

  return {
    toggleGameMode,
  };
}

function useSkip(key: string){
  const {goToNextQuestion}=useGoToNextQuestion()
  onMounted(() => {
    registerShortcut(key, skipCommand);
  });

  onUnmounted(() => {
    cancelShortcut(key, skipCommand);
  });

  function skipCommand(e: KeyboardEvent) {
    e.preventDefault();
    goToNextQuestion();
  }

  return {
    goToNextQuestion
  }
}
</script>

<style scoped>
.tip-btn {
  @apply btn btn-xs text-gray-500 bg-gray-100 hover:text-gray-100 hover:bg-gray-500 dark:text-white dark:bg-gray-500 dark:hover:text-white dark:hover:bg-fuchsia-500;
}
</style>
