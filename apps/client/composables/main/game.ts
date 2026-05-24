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

const messageContent = ref("");
const isMessageShow = ref(false);

export function useDeviceTip() {
  const { isMobile, isIpad } = useDevice();
  const { isLandscape } = useIsLandscape();

  watchEffect(() => {
    isMessageShow.value = (isIpad.value && !isLandscape.value) || isMobile.value;

    if (isMobile.value) {
      messageContent.value = "Thiết bị di động chưa được hỗ trợ, vui lòng đợi cập nhật";
      return;
    }

    if (isIpad.value && !isLandscape.value) {
      messageContent.value = "Xoay ngang màn hình để trải nghiệm tốt hơn~";
      return;
    }
  });

  return {
    messageContent,
    isMessageShow,
  };
}
