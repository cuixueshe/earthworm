import { useLocalStorageBoolean } from "~/utils/localStorage";

export const AUTO_PRONUNCIATION = "autoPronunciation";
export const KEYBOARD_SOUND_KEY = "keyboardSoundEnabled";
export const ACTIVE_KEYBOARD_SOUND = "activeKeyboardSound";

export function useAutoPronunciation() {
  const {
    value: autoPlaySound,
    isTrue: isAutoPlaySound,
    toggle: toggleAutoPlaySound,
    remove: removeAutoPlaySound,
  } = useLocalStorageBoolean(AUTO_PRONUNCIATION, true); // 默认开启

  return {
    autoPlaySound,
    isAutoPlaySound,
    toggleAutoPlaySound,
    removeAutoPlaySound,
  };
}

export function useKeyboardSound() {
  const {
    value: keyboardSound,
    isTrue: isKeyboardSoundEnabled,
    toggle: toggleKeyboardSound,
    remove: removeKeyboardSound,
  } = useLocalStorageBoolean(KEYBOARD_SOUND_KEY, true); // 默认开启

  return {
    keyboardSound,
    isKeyboardSoundEnabled,
    toggleKeyboardSound,
    removeKeyboardSound,
  };
}
export function useActiveKeyboardSound() {
  const {
    value: activeKeyboardSound,
    isTrue: isActiveKeyboardSound,
    changeKeyBoardSound: toggleActiveKeyboardSound,
    remove: removeActiveKeyboardSound,
  } = useLocalStorageBoolean(ACTIVE_KEYBOARD_SOUND, "默认");

  return {
    activeKeyboardSound,
    isActiveKeyboardSound,
    toggleActiveKeyboardSound,
    removeActiveKeyboardSound,
  };
}
