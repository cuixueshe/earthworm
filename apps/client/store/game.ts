import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from "./user";
import { fetchStartGame } from "~/api/game";

function useActiveCourseId() {
  const ACTIVE_COURSE_ID = "activeCourseId";

  const activeCourseId = ref<number>(
    Number(localStorage.getItem(ACTIVE_COURSE_ID))
  );

  function updateActiveCourseId(id: number) {
    activeCourseId.value = id;
    localStorage.setItem(ACTIVE_COURSE_ID, String(id));
  }

  function restActiveCourseId() {
    localStorage.removeItem(ACTIVE_COURSE_ID);
  }

  return {
    activeCourseId,
    restActiveCourseId,
    updateActiveCourseId,
  };
}

export const useGameStore = defineStore("game", () => {
  debugger;
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
    activeCourseId,
  };
});
