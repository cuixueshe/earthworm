import { ref, watch } from "vue";

/**
 * 目录是否可见
 */
const contentsVisible = ref(false);

/**
 * 是否正在监听是否点击了目录以外的区域
 */
let listeningIsSelf = false;

export function useContent() {
  /**
   * 切换目录可见
   */
  function toggleContents() {
    if (listeningIsSelf) return;
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
  function watchIsContentsItself(contentsEl: HTMLElement) {
    const onIsSelf = (e: any) => {
      listeningIsSelf = true;
      const isSelf = contentsEl!.contains(e.target);
      if (!isSelf) {
        contentsVisible.value = false;
        setTimeout(() => {
          listeningIsSelf = false;
        });
      }
    };

    watch(contentsVisible, (newVal: boolean) => {
      if (newVal) {
        document.addEventListener("click", onIsSelf, true);
      } else {
        document.removeEventListener("click", onIsSelf, true);
      }
    });
  }

  return {
    isShowContents,
    toggleContents,
    watchIsContentsItself,
  };
}
