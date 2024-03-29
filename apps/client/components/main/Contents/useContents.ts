import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

/**
 * 目录是否可见
 */
const contentsVisible = ref(false);

/**
 * 是否正在监听是否点击了目录以外的区域
 */
let isOnClickOutside = false;

export function useContent() {
  /**
   * 切换目录可见
   */
  function toggleContents() {
    if (isOnClickOutside) return;
    contentsVisible.value = !contentsVisible.value;
  }

  /**
   * 判断目录是否可见
   */
  function isShowContents() {
    return contentsVisible.value === true;
  }

  /**
   * 监听是否点击了目录以外的区域，是则隐藏目录
   * @param contentsEl 目录元素
   */
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
    watchClickOutside,
  };
}
