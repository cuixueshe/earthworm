import { ref } from "vue";

export const ACTIVE_COURSE_MAP = "activeCourseMap";

export function useActiveCourseMap() {
  const activeCourseMap = ref(getActiveCourseMap());

  function getActiveCourseMap() {
    return JSON.parse(localStorage.getItem(ACTIVE_COURSE_MAP) || "{}");
  }

  function updateActiveCourseMap(coursePackId: string, courseId: string) {
    activeCourseMap.value = getActiveCourseMap();
    activeCourseMap.value[coursePackId] = courseId;
    localStorage.setItem(ACTIVE_COURSE_MAP, JSON.stringify(activeCourseMap.value));
  }

  function removeActiveCourseMap(coursePackId: string) {
    activeCourseMap.value = getActiveCourseMap();
    delete activeCourseMap.value[coursePackId];
    localStorage.setItem(ACTIVE_COURSE_MAP, JSON.stringify(activeCourseMap.value));
  }

  function resetActiveCourseMap() {
    localStorage.removeItem(ACTIVE_COURSE_MAP);
  }

  return {
    activeCourseMap,
    resetActiveCourseMap,
    updateActiveCourseMap,
    removeActiveCourseMap,
  };
}
