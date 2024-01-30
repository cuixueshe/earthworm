<template>
  <div class="absolute left-0 right-0 bottom-[16vh] flex flex-col items-center">
    <div class="w-[210px] mb-4">
      <button class="tip-btn" @click="handlePlaySound">⌃ Ctrl+p</button>
      <span class="ml-2">play sound</span>
    </div>
    <div class="w-[210px]">
      <button class="tip-btn" @click="handleShowAnswer">⌃ Ctrl+n</button>
      <span class="ml-2">show {{ toggleTipText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameMode } from "~/composables/main/game";
import { registerShortcut, cancelShortcut } from "~/utils/keyboardShortcuts";
import { useCurrentStatementEnglishSound } from '~/composables/main/englishSound';
import { useSummary } from '~/composables/main/summary';

import { useCourseStore } from '~/store/course';
const courseStore = useCourseStore();
const { handlePlaySound } = usePlaySound()
const { handleShowAnswer } = useShowAnswer()

const toggleTipText = computed(() => {
  const { isAnswer } = useGameMode()
  return isAnswer() ? "question" : "answer";
})

//防止默认行为
const preventDefaultCtrlP = (event: any) => {
  if (event.ctrlKey && event.key === 'p') {
    event.preventDefault();
  }
};


onMounted(() => {
  window.addEventListener('keydown', preventDefaultCtrlP);
});


onUnmounted(() => {
  window.removeEventListener('keydown', preventDefaultCtrlP);
});

function usePlaySound() {
  const { playSound } = useCurrentStatementEnglishSound();

  onMounted(() => {
    registerShortcut("ctrl+p", handlePlaySound);
  })

  onUnmounted(() => {
    cancelShortcut("ctrl+p", handlePlaySound);
  });

  function handlePlaySound() {
    // 播放声音前保存当前的光标位置
    const inputElement = document.querySelector('input[type="text"]');
    if (inputElement instanceof HTMLInputElement) {
      const selectionStart = inputElement.selectionStart;
      if (typeof selectionStart === 'number') {
        courseStore.saveCursorPosition(selectionStart);
      }
    }

    playSound();

    // 播放声音后恢复光标位置
    courseStore.triggerCursorRestore();
  }
  return {
    handlePlaySound
  }
}

function useShowAnswer() {
  const { showAnswer, showQuestion } = useGameMode();

  onMounted(() => {
    registerShortcut("ctrl+n", handleShowAnswer);
  });

  onUnmounted(() => {
    cancelShortcut("ctrl+n", handleShowAnswer);
  });

  function handleShowAnswer() {
    // NOTE: registerShortcut 事件会记住注册时的面板状态，所以这里要重新获取下面板信息
    const { isAnswer } = useGameMode();
    const { showModal } = useSummary()
    if (showModal.value) {
      // 结算面板不做切换处理
      return
    }
    if (isAnswer()) {
      showQuestion()
    } else {
      showAnswer()
    }
  }

  return {
    handleShowAnswer
  }

}
</script>

<style scoped>
.tip-btn {
  @apply btn btn-xs text-gray-500 bg-gray-100 hover:text-gray-100 hover:bg-gray-500 dark:text-white dark:bg-gray-500 dark:hover:text-white dark:hover:bg-fuchsia-500
}
</style>
