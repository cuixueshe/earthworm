import { useLocalStorageBoolean } from "~/utils/localStorage";

export const AUTO_NEXT_QUESTION = "autoNextQuestion";

export function useAutoNextQuestion() {
  const {
    value: autoNextQuestion,
    isTrue: isAutoNextQuestion,
    toggle: toggleAutoQuestion,
    remove: removeAutoQuestion,
  } = useLocalStorageBoolean(AUTO_NEXT_QUESTION, false);

  return {
    autoNextQuestion,
    isAutoNextQuestion,
    toggleAutoQuestion,
    removeAutoQuestion,
  };
}
