import { COURSE_PROGRESS } from "~/store/course";

export function useCourseProgress() {
  function loadProgress() {
    const courseProgress = localStorage.getItem(COURSE_PROGRESS);
    if (!courseProgress) return;
    return JSON.parse(courseProgress);
  }

  return {
    loadProgress,
  };
}
