import { ref } from "vue";

export const USE_SPACE_SUBMIT_ANSWER = "useSpaceSubmitAnswer";

const useSpace = ref(false);

function loadCache() {
  const value = localStorage.getItem(USE_SPACE_SUBMIT_ANSWER);
  if (value === "false") {
    store(false);
  } else if (!value) {
    store(useSpace.value);
  } else {
    store(true);
  }
}

const store = function (value: boolean) {
  useSpace.value = value;
  localStorage.setItem(USE_SPACE_SUBMIT_ANSWER, `${value}`);
};

const toggleUseSpaceSubmitAnswer = () => {
  store(!useSpace.value);
};

const isUseSpaceSubmitAnswer = () => useSpace.value;

export function useSpaceSubmitAnswer() {
  loadCache();
  return {
    useSpace,
    isUseSpaceSubmitAnswer,
    toggleUseSpaceSubmitAnswer,
  };
}
