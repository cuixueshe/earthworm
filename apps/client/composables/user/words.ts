import { useLocalStorageBoolean } from "~/utils/localStorage";

export const SHOW_WORDS_WIDTH = "showWordsWidth";

export function useShowWordsWidth() {
  const {
    value: showWordsWidth,
    toggle: toggleAutoWordsWidth,
    isTrue: isShowWordsWidth,
    remove: removeAutoWordsWidth,
  } = useLocalStorageBoolean(SHOW_WORDS_WIDTH, true);

  return {
    showWordsWidth,
    toggleAutoWordsWidth,
    isShowWordsWidth,
    removeAutoWordsWidth,
  };
}
