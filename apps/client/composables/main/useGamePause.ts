import { ref, watch } from "vue";

import { useQuestionInput } from "~/components/main/QuestionInput/questionInputHelper";
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
  const { focusInput } = useQuestionInput();

  function resumeGame() {
    showGamePauseModal.value = false;
    gameStore.resumeGame();
    focusInput();
    resetInactivityTimer();
  }

  function pauseGame() {
    showGamePauseModal.value = true;
    gameStore.pauseGame();
    disableAutoPauseCheck();
  }

  function resetInactivityTimer() {
    disableAutoPauseCheck();
    inactivityTimer.value = setTimeout(() => {
      pauseGame();
    }, INACTIVITY_TIMEOUT);
  }

  function enableAutoPauseCheck() {
    watch(
      () => courseStore.statementIndex,
      () => {
        resetInactivityTimer();
      },
      {
        immediate: true,
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
