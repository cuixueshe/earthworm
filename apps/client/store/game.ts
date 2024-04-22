import { defineStore } from "pinia";

import { fetchStartGame } from "~/api/game";
// import { useActiveCourseId } from "~/composables/courses/activeCourse";
import { isAuthenticated } from "~/services/auth";

export const useGameStore = defineStore("game", () => {
  // const { updateActiveCourseId, restActiveCourseId } = useActiveCourseId();
  async function startGame() {
    // 保证每次获取的 activeCourseId 都是最新的
    // const { activeCourseId } = useActiveCourseId();

    if (!isAuthenticated()) {
      const firstCourseId = 1;

      return {
        courseId: firstCourseId,
      };
    } else {
      // if (activeCourseId.value) {
      //   return {
      //     courseId: activeCourseId.value,
      //   };
      // }

      const { cId } = await fetchStartGame();
      // updateActiveCourseId(cId);

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
  };
});
