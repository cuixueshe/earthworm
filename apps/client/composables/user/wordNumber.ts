import { useLocalStorageBoolean } from "~/utils/localStorage";

export const SHOW_WORD_NUMBER = "showWordNumber";

export function useShowWordNumber() {
  const {
    value: showWordNumber,
    toggle: toggleShowWordNumber,
    isTrue: isShowWordNumber,
    remove: removeShowWordNumber,
  } = useLocalStorageBoolean(SHOW_WORD_NUMBER, true);

  return {
    showWordNumber,
    toggleShowWordNumber,
    isShowWordNumber,
    removeShowWordNumber,
  };
}
