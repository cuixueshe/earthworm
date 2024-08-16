import { ref } from "vue";
import { toast } from "vue-sonner";

import { useGameMode } from "~/composables/main/game";
import { useSummary } from "~/composables/main/summary";
import { isAuthenticated } from "~/services/auth";
import { useCourseStore } from "~/store/course";
import { useMasteredElementsStore } from "~/store/masteredElements";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";
import { isWindows } from "~/utils/platform";

const undoShortcut = isWindows() ? "ctrl+z" : "command+z";

export function useMastered() {
  let toastId: string | number | undefined;
  const courseStore = useCourseStore();
  const masteredElements = useMasteredElementsStore();
  const { showQuestion } = useGameMode();
  const { showSummary } = useSummary();

  const addLoading = ref(false);
  async function markStatementAsMastered() {
    if (!isAuthenticated()) {
      toast.warning("需要登录哦");
      return;
    }

    // updateMarketedStatements 会影响 isLastStatement 返回的结果
    // 所以我们提前调用 isLastStatement 来记录好值
    if (addLoading.value) return;
    const isLastStatement = courseStore.isLastStatement();
    addLoading.value = true;
    const undoMasteredElements = await masteredElements.addElement({
      english: courseStore.currentStatement?.english!,
    });

    handleMasteredToast(undoMasteredElements);
    addLoading.value = false;
    courseStore.updateMarketedStatements();

    if (isLastStatement) {
      showSummary();
    } else {
      // 看看消完之后 是否全部都没有了
      // 这个是在 updatemarketedStatements 之后
      // 处理的 case 比如只剩下2个 good ，那么消除一个 good 之后 那么列表就应该为0了
      if (courseStore.isAllMastered()) {
        showSummary();
        return;
      }
      courseStore.toNextStatement();
      showQuestion();
    }

    function handleMasteredToast(undoMasteredElements: () => void) {
      function handleUndo(e: KeyboardEvent) {
        e.preventDefault();
        e.stopPropagation();
        undoMasteredElements();
        courseStore.updateMarketedStatements();
        cancelShortcut(undoShortcut, handleUndo);
        dismissToastIfExists();
      }

      dismissToastIfExists();
      cancelShortcut(undoShortcut);
      registerShortcut(undoShortcut, handleUndo);

      toastId = toast("成功添加到掌握列表中", {
        action: {
          label: "撤销",
          onClick: () => handleUndo(new KeyboardEvent("keydown")),
        },
        onAutoClose() {
          cancelShortcut(undoShortcut, handleUndo);
        },
      });
    }

    function dismissToastIfExists() {
      if (toastId !== undefined) {
        toast.dismiss(toastId);
      }
    }
  }

  return {
    markStatementAsMastered,
  };
}
