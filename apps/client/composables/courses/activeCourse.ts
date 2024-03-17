import { ref } from "vue";

export const ACTIVE_COURSE_ID = "activeCourseId";

export function useActiveCourseId() {
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
