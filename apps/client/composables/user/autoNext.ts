import { useLocalStorageBoolean } from "~/utils/localStorage";

export const AUTO_TONEXTQUESTION = "autotonextquestion";

export function useAutoNextQuestion() {
  const {
    value: autoNextQuestion,
    isTrue: isAutoQuestion,
    toggle: toggleAutoQuestion,
    remove: removeAutoQuestion,
  } = useLocalStorageBoolean(AUTO_TONEXTQUESTION, false); // 默认开启

  return {
    autoNextQuestion,
    isAutoQuestion,
    toggleAutoQuestion,
    removeAutoQuestion,
  };
}
