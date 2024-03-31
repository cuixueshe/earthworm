import { ref } from "vue";

const answerTip = ref(false);

export function useAnswerTip() {
  function showAnswerTip() {
    answerTip.value = true;
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
