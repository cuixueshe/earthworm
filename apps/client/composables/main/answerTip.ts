import { ref } from "vue";
import { validateInput } from "./question";

const answerTip = ref(false);

export function useAnswerTip() {
  function showAnswerTip() {
    answerTip.value = true;
    validateInput()
  }
  function hiddenAnswerTip() {
    answerTip.value = false;
  }

  const isAnswerTip = () => answerTip.value;

  return {
    answerTip,
    showAnswerTip,
    hiddenAnswerTip,
    isAnswerTip,
  };
}
