<template>
  <div class="absolute left-0 right-0 bottom-[16vh] flex flex-col items-center">
    <div class="w-[300px] mb-4 flex items-center">
      <div class="flex">
        <button
          class="tip-btn-ghost"
          @click="playSound"
        >
          <template
            v-for="(s, i) in getShortcutKeyItems('sound')"
            :key="s"
          >
            <div>
              <span class="px-2 py-1 rounded text-size-12 tip-btn">
                {{ s }}
              </span>
              <span
                v-if="i !== getShortcutKeyItems('sound').length - 1"
                class="px-1"
                >+</span
              >
            </div>
          </template>
        </button>
      </div>
      <span class="ml-2">play sound</span>
    </div>
    <div class="w-[300px] flex items-center mb-4">
      <div class="flex">
        <button
          class="tip-btn-ghost"
          @click="toggleGameMode"
        >
          <template
            v-for="(s, i) in getShortcutKeyItems('answer')"
            :key="s"
          >
            <div>
              <span class="px-2 py-1 rounded text-size-12 tip-btn">
                {{ s }}
              </span>
              <span
                v-if="i !== getShortcutKeyItems('answer').length - 1"
                class="px-1"
                >+</span
              >
            </div>
          </template>
        </button>
      </div>
      <span class="ml-2">{{ toggleTipText }}</span>
    </div>
    <div class="w-[300px] flex items-center mb-4">
      <div class="flex">
        <button
          class="tip-btn-ghost"
          @click="toggleGameMode"
        >
          <div>
            <span class="px-2 py-1 rounded text-size-12 tip-btn"> Space </span>
          </div>
        </button>
      </div>
      <span class="ml-2">fix incorrect word</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { useAnswerTip } from "~/composables/main/answerTip";
import { useCurrentStatementEnglishSound } from "~/composables/main/englishSound";
import { useGameMode } from "~/composables/main/game";
import { useSummary } from "~/composables/main/summary";
import { useShortcutKeyMode } from "~/composables/user/shortcutKey";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

const { shortcutKeys } = useShortcutKeyMode();
const { playSound } = usePlaySound(shortcutKeys.value.sound);
const { toggleGameMode } = useShowAnswer(shortcutKeys.value.answer);

function getShortcutKeyItems(type: string) {
  return shortcutKeys.value[type].split("+");
}

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
</script>

<style scoped>
.tip-btn {
  @apply text-gray-500 bg-gray-100 dark:text-white dark:bg-gray-500;
}
.tip-btn-ghost {
  @apply btn btn-sm btn-ghost gap-0 rounded dark:hover:text-white dark:hover:bg-fuchsia-500;
}
</style>
