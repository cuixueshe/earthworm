import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { fetchStartGame } from "~/api/game";
import { useActiveCourseId } from "~/composables/courses/activeCourse";

export const useGameStore = defineStore("game", () => {
  const { updateActiveCourseId, restActiveCourseId, activeCourseId } =
    useActiveCourseId();

  async function startGame() {
    const userStore = useUserStore();

    if (!userStore.user) {
      const firstCourseId = 1;

      return {
        courseId: firstCourseId,
      };
    } else {
      if (activeCourseId.value) {
        return {
          courseId: activeCourseId.value,
        };
      }

      const { cId } = await fetchStartGame();
      updateActiveCourseId(cId);

      return {
        courseId: cId,
      };
    }
  }

  function resetGame() {
    restActiveCourseId();
  }

  return {
    startGame,
    resetGame,
    updateActiveCourseId,
    activeCourseId,
  };
});
