import { defineStore } from "pinia";
import { ref } from "vue";

import { useLearningTimeTracker } from "~/composables/main/learningTimeTracker";
import { isAuthenticated } from "~/services/auth";

enum GameStatus {
  NOT_PLAYED = "not_played",
  STARTED = "started",
  PAUSED = "paused",
  LEVEL_COMPLETED = "level_completed",
}

export const useGameStore = defineStore("game", () => {
  const { startTracking, stopTracking } = useLearningTimeTracker();
  const gameStatus = ref<GameStatus>(GameStatus.NOT_PLAYED);

  function startGame() {
    gameStatus.value = GameStatus.STARTED;
    if (isAuthenticated()) {
      startTracking();
    }
  }

  function exitGame() {
    gameStatus.value = GameStatus.NOT_PLAYED;
    if (isAuthenticated()) {
      stopTracking();
    }
  }

  function pauseGame() {
    if (gameStatus.value === GameStatus.STARTED) {
      gameStatus.value = GameStatus.PAUSED;
      if (isAuthenticated()) {
        stopTracking();
      }
      return true;
    } else {
      console.log("Game is not started or already paused");
      return false;
    }
  }

  function resumeGame() {
    if (gameStatus.value === GameStatus.PAUSED) {
      gameStatus.value = GameStatus.STARTED;
      if (isAuthenticated()) {
        startTracking();
      }
    } else {
      console.log("Game is not paused");
    }
  }

  function completeLevel() {
    if (gameStatus.value === GameStatus.STARTED) {
      gameStatus.value = GameStatus.LEVEL_COMPLETED;
      if (isAuthenticated()) {
        stopTracking();
      }
    } else {
      console.log("Game is not started so cannot complete level");
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

  function isLevelCompleted() {
    return gameStatus.value === GameStatus.LEVEL_COMPLETED;
  }

  return {
    gameStatus,
    startGame,
    pauseGame,
    resumeGame,
    exitGame,
    completeLevel,
    isGameNotPlayed,
    isGameStarted,
    isGamePaused,
    isLevelCompleted,
  };
});
