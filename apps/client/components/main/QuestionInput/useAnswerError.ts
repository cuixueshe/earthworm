import { useAnswerTip } from "~/composables/main/answerTip";
import { useErrorTip } from "~/composables/user/errorTip";
import { usePlayTipSound } from "./useTypingSound";

let wrongTimes = 0;
export function useAnswerError() {
  const { playErrorSound } = usePlayTipSound();
  const { isShowErrorTip } = useErrorTip();
  const { showAnswerTip, hiddenAnswerTip } = useAnswerTip();

  function handleAnswerError() {
    playErrorSound();
    wrongTimes++;
    if (isShowErrorTip() && wrongTimes >= 3) {
      showAnswerTip();
    }
  }

  function resetCloseTip() {
    wrongTimes = 0;
    hiddenAnswerTip();
  }

  return {
    handleAnswerError,
    resetCloseTip,
  };
}
