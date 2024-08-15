import { reactive } from "vue";

interface ToolBar {
  times: number;
  rate: number;
  interval: number;
  [key: string]: number;
}

export const defaultOptions: ToolBar = {
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
