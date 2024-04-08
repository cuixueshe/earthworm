import { reactive } from "vue";
import { useCurrentStatementEnglishSound } from "~/composables/main/englishSound";

export const defaultOptions = {
  times: 1,
  rate: 1,
  interval: 1000,
};

const toolBarData = reactive({
  ...defaultOptions,
});

export function useToolbar() {
  function saveToolBarData() {
    localStorage.setItem("dictationOptions", JSON.stringify(toolBarData));
  }

  function recoverToolBarData() {
    const options = localStorage.getItem("dictationOptions");
    if (options) {
      Object.assign(toolBarData, JSON.parse(options));
    }
  }

  function resetToolBarData() {
    Object.assign(toolBarData, defaultOptions);
  }

  return {
    toolBarData,
    saveToolBarData,
    recoverToolBarData,
    resetToolBarData,
  };
}

export function play() {
  const { times, rate, interval } = toolBarData;
  const { playSound } = useCurrentStatementEnglishSound();
  return playSound({ times, rate, interval });
}
