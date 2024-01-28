import { fetchStartGame } from "~/api/game";
import { useUserStore } from "~/store/user";

export enum GameMode {
  Question = "question",
  Answer = "answer",
  Summary = "summary",
}

const gameMode = ref<GameMode>(GameMode.Question);

export function useGameMode() {
  function showAnswer() {
    gameMode.value = GameMode.Answer;
  }

  function showQuestion() {
    gameMode.value = GameMode.Question;
  }

  function showSummary() {
    gameMode.value = GameMode.Summary;
  }

  function isAnswer() {
    return gameMode.value === GameMode.Answer;
  }

  function isQuestion() {
    return gameMode.value === GameMode.Question;
  }

  function isSummary() {
    return gameMode.value === GameMode.Summary;
  }

  return {
    gameMode,
    isAnswer,
    isQuestion,
    isSummary,
    showAnswer,
    showQuestion,
    showSummary,
  };
}

export async function startGame() {
  const userStore = useUserStore();
  const firstCourseId = 1;

  let courseId;
  if (!userStore.user) {
    courseId = firstCourseId;
  } else {
    const { cId } = await fetchStartGame();
    courseId = cId;
  }

  return {
    courseId,
  };
}
