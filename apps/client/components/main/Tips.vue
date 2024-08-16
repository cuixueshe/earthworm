<template>
  <div class="relative flex h-32 items-center justify-center">
    <div class="z-10 hidden items-center justify-center min-[780px]:flex">
      <button
        v-for="keybinding in keybindings"
        @click="keybinding.eventFn"
        class="btn btn-ghost"
      >
        <div class="flex items-center gap-0.5">
          <UKbd v-for="keyStr in parseShortcutKeys(keybinding.keys)">
            {{ keyStr }}
          </UKbd>
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
import { useMastered } from "~/composables/main/useMastered";
import { useShortcutKeyMode } from "~/composables/user/shortcutKey";
import { cancelShortcut, parseShortcutKeys, registerShortcut } from "~/utils/keyboardShortcuts";
import { useAnswer } from "./QuestionInput/useAnswer";
import { useWrapperQuestionInput } from "./QuestionInput/useWrapperQuestionInput";

const { toggleAnswerTip, isAnswerTip } = useAnswerTip();
const { shortcutKeys } = useShortcutKeyMode();
const { playSound } = usePlaySound(shortcutKeys.value.sound);
const { goToNextQuestion } = useAnswer();
const { showQuestion, isQuestion } = useGameMode();
const { submitAnswer } = useWrapperQuestionInput();
const { handleMastered } = useMasteredShortcut();
useShowAnswer(shortcutKeys.value.answer);

const keybindings = computed(() => {
  const questionItems = [
    {
      keys: "Enter",
      text: "提交",
      eventFn: () => {
        submitAnswer();
      },
    },
    {
      keys: shortcutKeys.value.answer,
      text: isAnswerTip() ? "隐藏答案" : "显示答案",
      eventFn: () => {
        toggleAnswerTip();
      },
    },
  ];

  const answerItems = [
    {
      keys: "Enter",
      text: "下一题",
      eventFn: () => {
        goToNextQuestion();
      },
    },
    {
      keys: shortcutKeys.value.answer,
      text: "再来一次",
      eventFn: () => {
        showQuestion();
      },
    },
  ];

  const normalItems = [
    {
      keys: shortcutKeys.value.sound,
      text: "播放发音",
      eventFn: playSound,
    },
    {
      keys: shortcutKeys.value.mastered,
      text: "掌握",
      eventFn: handleMastered,
    },
  ];

  const resultItems: any = [...normalItems];

  if (isQuestion()) {
    resultItems.push(...questionItems);
  } else {
    resultItems.push(...answerItems);
  }

  return resultItems;
});

function useMasteredShortcut() {
  const { markStatementAsMastered } = useMastered();

  function handleMastered() {
    markStatementAsMastered();
  }

  onMounted(() => {
    registerShortcut(shortcutKeys.value.mastered, handleMastered);
  });

  onUnmounted(() => {
    cancelShortcut(shortcutKeys.value.mastered, handleMastered);
  });

  return {
    handleMastered,
  };
}

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
  onMounted(() => {
    registerShortcut(key, handleShowAnswer);
  });

  onUnmounted(() => {
    cancelShortcut(key, handleShowAnswer);
  });

  function handleShowAnswer(e: KeyboardEvent) {
    e.preventDefault();
    // NOTE: registerShortcut 事件会记住注册时的面板状态，所以这里要重新获取下面板信息
    const { showModal } = useSummary();
    if (showModal.value) return;

    const { isAnswer } = useGameMode();
    if (isAnswer()) {
      showQuestion();
    } else {
      toggleAnswerTip();
    }
  }
}
</script>
