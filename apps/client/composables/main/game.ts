const gameMode = ref<"question" | "answer">("question");

export function useGameMode() {
  function showAnswer() {
    gameMode.value = "answer";
  }

  function showQuestion() {
    gameMode.value = "question";
  }

  return {
    gameMode,
    showAnswer,
    showQuestion,
  };
}
