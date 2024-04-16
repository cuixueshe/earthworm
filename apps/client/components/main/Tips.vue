<template>
  <div class="relative h-32 flex items-center justify-center">
    <div class="min-[780px]:flex hidden items-center justify-center z-10">
      <button
        v-for="keybinding in keybindings"
        @click="keybinding.eventFn"
        class="btn btn-ghost"
      >
        <div class="flex items-center justify-center gap-2 text-center">
          <div
            v-for="keyStr in parseShortcutKeys(keybinding.keys)"
            class="kbd"
          >
            {{ keyStr }}
          </div>
        </div>
        <span>{{ keybinding.text }}</span>
      </button>
    </div>

    <MainPrevAndNextBtn />
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

const answerTipText = computed(() => {
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

const keybindings = computed(() => {
  return [
    {
      keys: shortcutKeys.value.sound,
      text: "播放发音",
      eventFn: playSound,
    },
    {
      keys: shortcutKeys.value.answer,
      text: answerTipText.value,
      eventFn: toggleGameMode,
    },
    {
      keys: "Space",
      text: spaceTipText.value,
      eventFn: null,
    },
  ];
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
