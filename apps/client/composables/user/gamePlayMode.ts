import { ref } from "vue";

export enum GamePlayMode {
  Dictation = "DICTATION",
  NativeToEnglish = "NATIVE_TO_ENGLISH",
}

export const gamePlayModeLabels: { [key in GamePlayMode]: string } = {
  [GamePlayMode.NativeToEnglish]: "Việt - Anh",
  [GamePlayMode.Dictation]: "Chính tả",
};

const GamePlayModeKey = "gamePlayMode";
const currentGamePlayMode = ref<GamePlayMode>(GamePlayMode.NativeToEnglish);

function loadCache() {
  let mode = getStore() || currentGamePlayMode.value;
  // Migration: rename old CHINESE_TO_ENGLISH value to NATIVE_TO_ENGLISH
  if (mode === ("CHINESE_TO_ENGLISH" as GamePlayMode)) {
    mode = GamePlayMode.NativeToEnglish;
    setStore(mode);
  }
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

  function isNativeToEnglishMode() {
    return currentGamePlayMode.value === GamePlayMode.NativeToEnglish;
  }

  return {
    toggleGamePlayMode,
    getGamePlayModeOptions,
    currentGamePlayMode,
    isDictationMode,
    isNativeToEnglishMode,
  };
}
