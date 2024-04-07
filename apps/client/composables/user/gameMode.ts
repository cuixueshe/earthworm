import { ref } from "vue";

export enum GameMode {
  Dictation = "DICTATION",
  ChineseToEnglish = "CHINESE_TO_ENGLISH",
}

export const gameModeLabels: { [key in GameMode]: string } = {
  [GameMode.ChineseToEnglish]: "中译英",
  [GameMode.Dictation]: "听写",
};

const GameModeKey = "gameMode";
const currentGameMode = ref<GameMode>(GameMode.ChineseToEnglish);

function loadCache() {
  const mode = getStore() || currentGameMode.value;
  currentGameMode.value = mode;
}

function getStore() {
  return localStorage.getItem(GameModeKey) as GameMode;
}

function setStore(value: GameMode) {
  localStorage.setItem(GameModeKey, value);
}

loadCache();

export function useGameMode() {
  function getGameModeOptions() {
    return Object.entries(gameModeLabels).map(([key, value]) => {
      return {
        label: value,
        value: key,
      };
    });
  }

  function toggleGameMode(mode: GameMode) {
    currentGameMode.value = mode;
    setStore(mode);
  }

  return {
    toggleGameMode,
    getGameModeOptions,
    currentGameMode,
  };
}
