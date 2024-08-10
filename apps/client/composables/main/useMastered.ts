import { ref } from "vue";

import { useGameMode } from "~/composables/main/game";
import { useSummary } from "~/composables/main/summary";
import { useCourseStore } from "~/store/course";
import { useMasteredElementsStore } from "~/store/masteredElements";

export function useMastered() {
  const courseStore = useCourseStore();
  const masteredElements = useMasteredElementsStore();
  const { showQuestion } = useGameMode();
  const { showSummary } = useSummary();

  const addLoading = ref(false);
  async function markStatementAsMastered() {
    // updateMarketedStatements 会影响 isLastStatement 返回的结果
    // 所以我们提前调用 isLastStatement 来记录好值
    if (addLoading.value) return;
    const isLastStatement = courseStore.isLastStatement();
    addLoading.value = true;
    await masteredElements.addElement({
      english: courseStore.currentStatement?.english!,
    });
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
  }

  return {
    markStatementAsMastered,
  };
}
