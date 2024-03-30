import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

const contentsVisible = ref(false);
let isOnClickOutside = false;

export function useContent() {
  function toggleContents() {
    if (isOnClickOutside) return;
    contentsVisible.value = !contentsVisible.value;
  }

  function closeContents() {
    contentsVisible.value = false;
  }

  function isShowContents() {
    return contentsVisible.value === true;
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
    closeContents,
    watchClickOutside,
  };
}
