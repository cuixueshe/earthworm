<template>
  <div class="absolute left-0 right-0 bottom-[12vh] flex flex-col items-center">
    <div class="w-[210px] mb-4">
      <button
        class="tip-btn"
        @click="playSound"
      >
        ⌃ {{ shortcutKeys.sound }}
      </button>
      <span class="ml-2">播放发音</span>
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
        class="mr-1 tip-btn"
        @click="goToNextQuestion"
      >
        ⌃ {{ shortcutKeys.skip }}
      </button>
      <span class="ml-2">下一题</span>
    </div>
    <div class="w-[210px] mb-4">
      <button
        class="tip-btn mr-1"
        @click="BackPreviousQuestion"
      >
        ⌃ {{ shortcutKeys.previous }}
      </button>
      <span class="ml-2">{{ "previous" }}</span>
    </div>
    <div class="w-[210px]">
      <button class="tip-btn">Space</button>
      <span class="ml-2">{{ spaceTipText }} </span>
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
import { useCourseStore } from "~/store/course";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";
import Message from "./Message/useMessage";

const { shortcutKeys } = useShortcutKeyMode();
const { playSound } = usePlaySound(shortcutKeys.value.sound);
const { toggleGameMode } = useShowAnswer(shortcutKeys.value.answer);
const { goToNextQuestion } = useSkipThisQuestion(shortcutKeys.value.skip);
const { BackPreviousQuestion } = usePreviosQuestion(
  shortcutKeys.value.previous
);
const { showQuestion } = useGameMode();
const { showSummary } = useSummary();
const courseStore = useCourseStore();

const toggleTipText = computed(() => {
  let text = "";
  const { isAnswer } = useGameMode();
  const { isAnswerTip } = useAnswerTip();
  if (isAnswer()) {
    text = "再来一次";
  } else {
    if (isAnswerTip()) {
      text = "关闭答案预览面板";
    } else {
      text = "显示答案预览面板";
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
function useSkipThisQuestion(key: string) {
  function goToNextQuestion() {
    if (courseStore.isAllDone()) {
      showSummary();
      return;
    }

    courseStore.toNextStatement();
    showQuestion();
  }

  function handleShortcut() {
    onMounted(() => {
      registerShortcut(key, goToNextQuestion);
    });

    onUnmounted(() => {
      cancelShortcut(key, goToNextQuestion);
    });
  }

  handleShortcut();

  return {
    goToNextQuestion,
  };
}
function usePreviosQuestion(key: string) {
  function BackPreviousQuestion() {
    if (courseStore.statementIndex === 0) {
      Message.error("已经是第一题了!");
      return;
    }
    courseStore.toPreviousStatement();
    showQuestion();
  }
  function handleShortcut() {
    onMounted(() => {
      registerShortcut(key, BackPreviousQuestion);
    });

    onUnmounted(() => {
      cancelShortcut(key, BackPreviousQuestion);
    });
  }

  handleShortcut();

  return {
    BackPreviousQuestion,
  };
}
</script>

<style scoped>
.tip-btn {
  @apply btn btn-xs text-gray-500 bg-gray-100 hover:text-gray-100 hover:bg-gray-500 dark:text-white dark:bg-gray-500 dark:hover:text-white dark:hover:bg-fuchsia-500;
}
</style>
