import { debounce } from "lodash-es";
import { ref, watch } from "vue";

import { useWrapperQuestionInput } from "~/components/main/QuestionInput/useWrapperQuestionInput";
import { useCourseStore } from "~/store/course";
import { useGameStore } from "~/store/game";

const inactivityTimer = ref<NodeJS.Timeout>();
const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5分钟，单位毫秒

const showGamePauseModal = ref(false);
/**
 * 用于处理游戏暂停页面(UI)逻辑
 * 暂停 恢复 开启自动检测暂停等
 * @returns
 */
export function useGamePause() {
  const courseStore = useCourseStore();
  const gameStore = useGameStore();
  const { inputValue } = useWrapperQuestionInput();

  function resumeGame() {
    showGamePauseModal.value = false;
    gameStore.resumeGame();
    resetInactivityTimer();
  }

  function pauseGame() {
    const pauseResult = gameStore.pauseGame();
    if (pauseResult) {
      showGamePauseModal.value = true;
      disableAutoPauseCheck();
    } else {
      // 游戏还有其他的状态 比如关卡完成
      console.log("游戏没开始 暂停不了");
    }
  }

  function resetInactivityTimer() {
    disableAutoPauseCheck();
    inactivityTimer.value = setTimeout(() => {
      pauseGame();
    }, INACTIVITY_TIMEOUT);
  }

  function enableAutoPauseCheck() {
    const debouncedResetInactivityTimer = debounce(resetInactivityTimer, 500);

    // 用户切换题目的时候重置计时器
    watch(
      () => courseStore.statementIndex,
      () => {
        debouncedResetInactivityTimer();
      },
      {
        immediate: true,
      },
    );

    // 用户输入内容的时候重置计时器
    watch(
      () => inputValue.value,
      () => {
        debouncedResetInactivityTimer();
      },
    );
  }

  function disableAutoPauseCheck() {
    if (inactivityTimer.value) {
      clearTimeout(inactivityTimer.value);
    }
  }

  return {
    showGamePauseModal,
    resumeGame,
    pauseGame,
    enableAutoPauseCheck,
    disableAutoPauseCheck,
  };
}
