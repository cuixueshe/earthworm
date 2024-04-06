import { useDevice, useIsLandscape } from "#imports";
import { ref, watchEffect } from "vue";

export enum GameMode {
  Question = "question",
  Answer = "answer",
}

const gameMode = ref<GameMode>(GameMode.Question);

export function useGameMode() {
  function showAnswer() {
    gameMode.value = GameMode.Answer;
  }

  function showQuestion() {
    gameMode.value = GameMode.Question;
  }

  function isAnswer() {
    return gameMode.value === GameMode.Answer;
  }

  function isQuestion() {
    return gameMode.value === GameMode.Question;
  }

  return {
    gameMode,
    isAnswer,
    isQuestion,
    showAnswer,
    showQuestion,
  };
}

export function useMessageTip() {
  const messageContent = ref("");
  const isMessageShow = ref(false);

  const { isMobile, isIpad } = useDevice();
  const { isLandscape } = useIsLandscape();

  watchEffect(() => {
    if (isIpad.value && !isLandscape.value) {
      messageContent.value = "请横向屏幕以获得最佳体验";
      isMessageShow.value = true;
      return;
    }
    if (isMobile.value) {
      messageContent.value = "请使用电脑或平板以获得最佳体验";
      isMessageShow.value = true;
    }
  });

  return {
    messageContent,
    isMessageShow,
  };
}
