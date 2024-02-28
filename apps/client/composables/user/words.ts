import { ref } from "vue";

const AUTO_WORDS_WIDTH = "autoShowWordsWidth";

export function useShowWordsWidth() {
  const autoShowWordsWidth = ref(true);

  init();

  function init() {
    const value = localStorage.getItem(AUTO_WORDS_WIDTH);

    autoShowWordsWidth.value = value !== "false";
  }

  function toggleAutoWordsWidth() {
    localStorage.setItem(AUTO_WORDS_WIDTH, `${!autoShowWordsWidth.value}`);
    autoShowWordsWidth.value = !autoShowWordsWidth.value;
  }

  function isShowWordsWidth() {
    return autoShowWordsWidth.value;
  }

  return {
    autoShowWordsWidth,
    toggleAutoWordsWidth,
    isShowWordsWidth,
  };
}
