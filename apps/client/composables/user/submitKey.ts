import { useLocalStorageBoolean } from "~/utils/localStorage";

export const SPACE_SUBMIT_ANSWER = "spaceSubmitAnswer";
export function useSpaceSubmitAnswer() {
  const {
    value: useSpace,
    toggle: toggleUseSpaceSubmitAnswer,
    isTrue: isUseSpaceSubmitAnswer,
    remove: removeUseSpaceSubmitAnswer,
  } = useLocalStorageBoolean(SPACE_SUBMIT_ANSWER, false);

  return {
    useSpace,
    isUseSpaceSubmitAnswer,
    toggleUseSpaceSubmitAnswer,
    removeUseSpaceSubmitAnswer,
  };
}
