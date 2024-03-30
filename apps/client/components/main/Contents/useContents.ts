import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

const contentsVisible = ref(false);
let isOnClickOutside = false;

export function useContent() {
  function isShowContents() {
    return contentsVisible.value === true;
  }

  function toggleContents(e: MouseEvent) {
    if (!isOnClickOutside) {
      contentsVisible.value = !contentsVisible.value;
    }
  }

  function hideContents() {
    contentsVisible.value = false;
  }

  function watchClickOutside(contentsEl: HTMLElement) {
    onClickOutside(contentsEl, () => {
      if (contentsVisible.value) {
        isOnClickOutside = true;
        contentsVisible.value = false;
        // 隐藏时防止和 toggleContents 冲突
        setTimeout(() => {
          isOnClickOutside = false;
        });
      }
    });
  }

  return {
    isShowContents,
    toggleContents,
    hideContents,
    watchClickOutside,
  };
}
