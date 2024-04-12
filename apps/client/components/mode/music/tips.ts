import { ref } from "vue";

export enum TipItem {
  Chinese = "CHINESE",
  English = "ENGLISH",
  AllShow = "ALL_SHOW",
  AllHidden = "ALL_HIDDEN",
}

export const tipItemLabels: { [key in TipItem]: string } = {
  [TipItem.Chinese]: "中文",
  [TipItem.English]: "英文",
  [TipItem.AllShow]: "中英文",
  [TipItem.AllHidden]: "全隐藏",
};

const currentTip = ref<TipItem>(TipItem.Chinese);

export function useTips() {
  function getTipOptions() {
    return Object.entries(tipItemLabels).map(([key, value]) => {
      return {
        label: value,
        value: key,
      };
    });
  }

  function toggleTipItem(mode: TipItem) {
    currentTip.value = mode;
  }

  return {
    currentTip,
    getTipOptions,
    toggleTipItem,
  };
}
