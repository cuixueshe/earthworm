import { ref } from "vue";

/**
 * 目录是否可见
 */
const contentsVisible = ref(false);

export function useContent() {
  /**
   * 切换目录可见
   */
  function toggleContents() {
    contentsVisible.value = !contentsVisible.value;
  }

  /**
   * 判断目录是否可见
   */
  function isShow() {
    return contentsVisible.value === true;
  }

  return {
    isShow,
    toggleContents,
  };
}
