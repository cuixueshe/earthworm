const mode = ref<"question" | "answer">("question");

export function useGameMode() {
  function showAnswer() {
    mode.value = "answer";
  }

  function showQuestion() {
    mode.value = "question";
  }

  return {
    mode,
    showAnswer,
    showQuestion,
  };
}

