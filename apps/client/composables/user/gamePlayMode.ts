import { ref } from "vue";

export enum GamePlayMode {
  Dictation = "DICTATION",
  ChineseToEnglish = "CHINESE_TO_ENGLISH",
}

export const gamePlayModeLabels: { [key in GamePlayMode]: string } = {
  [GamePlayMode.ChineseToEnglish]: "中译英",
  [GamePlayMode.Dictation]: "听写",
};

const GamePlayModeKey = "gamePlayMode";
const currentGamePlayMode = ref<GamePlayMode>(GamePlayMode.ChineseToEnglish);

function loadCache() {
  const mode = getStore() || currentGamePlayMode.value;
  currentGamePlayMode.value = mode;
}

function getStore() {
  return localStorage.getItem(GamePlayModeKey) as GamePlayMode;
}

function setStore(value: GamePlayMode) {
  localStorage.setItem(GamePlayModeKey, value);
}

loadCache();

export function useGamePlayMode() {
  function getGamePlayModeOptions() {
    return Object.entries(gamePlayModeLabels).map(([key, value]) => {
      return {
        label: value,
        value: key,
      };
    });
  }

  function toggleGamePlayMode(mode: GamePlayMode) {
    currentGamePlayMode.value = mode;
    setStore(mode);
  }

  function isDictationMode() {
    return currentGamePlayMode.value === GamePlayMode.Dictation;
  }

  function isChineseToEnglishMode() {
    return currentGamePlayMode.value === GamePlayMode.ChineseToEnglish;
  }

  return {
    toggleGamePlayMode,
    getGamePlayModeOptions,
    currentGamePlayMode,
    isDictationMode,
    isChineseToEnglishMode,
  };
}
