import { defineStore } from "pinia";
import { ref } from "vue";

import { useLearningTimeTracker } from "~/composables/main/learningTimeTracker";

enum GameStatus {
  NOT_PLAYED = "not_played",
  STARTED = "started",
  PAUSED = "paused",
}

export const useGameStore = defineStore("game", () => {
  const gameStatus = ref(GameStatus.NOT_PLAYED);
  const { startTracking, stopTracking } = useLearningTimeTracker();

  function startGame() {
    gameStatus.value = GameStatus.STARTED;
    startTracking();
  }

  function exitGame() {
    gameStatus.value = GameStatus.NOT_PLAYED;
    stopTracking();
  }

  function pauseGame() {
    if (gameStatus.value === GameStatus.STARTED) {
      gameStatus.value = GameStatus.PAUSED;
      stopTracking();
    } else {
      console.log("Game is not started or already paused");
    }
  }

  function resumeGame() {
    if (gameStatus.value === GameStatus.PAUSED) {
      gameStatus.value = GameStatus.STARTED;
      startTracking();
    } else {
      console.log("Game is not paused");
    }
  }
  function isGameNotPlayed() {
    return gameStatus.value === GameStatus.NOT_PLAYED;
  }

  function isGameStarted() {
    return gameStatus.value === GameStatus.STARTED;
  }

  function isGamePaused() {
    return gameStatus.value === GameStatus.PAUSED;
  }

  return {
    gameStatus,
    startGame,
    pauseGame,
    resumeGame,
    exitGame,
    isGameNotPlayed,
    isGameStarted,
    isGamePaused,
  };
});
