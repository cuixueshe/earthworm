import {
  LocalStorageSound,
  useLocalStorageBoolean,
} from "~/utils/localStorage";

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
export function useActiveKeyboardSound(value: string = "默认音效") {
  const {
    value: activeKeyboardSound,
    isTrue: isActiveKeyboardSound,
    toggle: toggleActiveKeyboardSound,
    remove: removeActiveKeyboardSound,
  } = LocalStorageSound(ACTIVE_KEYBOARD_SOUND, value); // 默认开启

  return {
    activeKeyboardSound,
    isActiveKeyboardSound,
    toggleActiveKeyboardSound,
    removeActiveKeyboardSound,
  };
}
