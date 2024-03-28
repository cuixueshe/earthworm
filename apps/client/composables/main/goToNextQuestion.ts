import { useGameMode } from "~/composables/main/game";
import { useSummary } from "~/composables/main/summary";
import { useCourseStore } from "~/store/course";
const { showSummary } = useSummary();
const { showQuestion } = useGameMode();

const courseStore = useCourseStore();

export function useGoToNextQuestion() {
  function goToNextQuestion() {
    if (courseStore.isAllDone()) {
      showSummary();
      return;
    }

    courseStore.toNextStatement();
    showQuestion();
  }

  return {
    goToNextQuestion,
  };
}
