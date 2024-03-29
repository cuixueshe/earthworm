export const COURSE_PROGRESS = "courseProgress";

function saveProgressInLocal(courseId: number, index: number) {
  const progress = JSON.parse(localStorage.getItem(COURSE_PROGRESS)!) || {};
  progress[courseId] = index;
  localStorage.setItem(COURSE_PROGRESS, JSON.stringify(progress));
}

export function useCourseProgress() {
  async function saveProgress(courseId: number, index: number) {
    saveProgressInLocal(courseId, index);
  }

  function loadProgress(courseId: number) {
    const progress = JSON.parse(localStorage.getItem(COURSE_PROGRESS)!) || {};
    return progress[courseId] || 0;
  }

  function cleanProgress() {
    localStorage.removeItem(COURSE_PROGRESS);
  }

  return {
    saveProgress,
    loadProgress,
    cleanProgress,
  };
}
