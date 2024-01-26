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
    GameMode,
    gameMode,
    isAnswer,
    isQuestion,
    showAnswer,
    showQuestion,
  };
}
