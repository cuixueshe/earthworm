<template>
  <div class="absolute left-0 right-0 bottom-[12vh] flex flex-col items-center">
    <div class="mb-4">
      <button
        class="btn btn-ghost"
        @click="playSound"
      >
        <div class="flex items-center justify-center gap-2 text-center">
          <div
            v-for="key in parseShortcutKeys(shortcutKeys.sound)"
            class="kbd"
          >
            {{ key }}
          </div>
        </div>
        <span>播放发音</span>
      </button>
    </div>
    <div class="mb-4">
      <button
        class="btn btn-ghost"
        @click="toggleGameMode"
      >
        <div class="flex items-center justify-center gap-2 text-center">
          <div
            v-for="key in parseShortcutKeys(shortcutKeys.answer)"
            class="kbd"
          >
            {{ key }}
          </div>
        </div>
        <span>{{ toggleTipText }}</span>
      </button>
    </div>
    <div>
      <button class="btn btn-ghost">
        <span class="kbd">Space</span>
        <span>{{ spaceTipText }} </span>
      </button>
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
import {
  cancelShortcut,
  parseShortcutKeys,
  registerShortcut,
} from "~/utils/keyboardShortcuts";
const { shortcutKeys } = useShortcutKeyMode();
const { playSound } = usePlaySound(shortcutKeys.value.sound);
const { toggleGameMode } = useShowAnswer(shortcutKeys.value.answer);

const toggleTipText = computed(() => {
  let text = "";
  const { isAnswer } = useGameMode();
  const { isAnswerTip } = useAnswerTip();
  if (isAnswer()) {
    text = "再来一次";
  } else {
    if (isAnswerTip()) {
      text = "隐藏答案";
    } else {
      text = "显示答案";
    }
  }
  return text;
});

const spaceTipText = computed(() => {
  const { isAnswer } = useGameMode();
  if (isAnswer()) {
    return "下一题";
  } else {
    return "修复错误单词";
  }
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
