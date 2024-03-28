export const COURSE_PROGRESS = "courseProgress";
const COURSE_LATEST_PROGRESS = "courseLatestProgress";

function saveProgressInLocal(courseId: number, index: number) {
  const progress = JSON.parse(localStorage.getItem(COURSE_PROGRESS)!) || {};
  progress[courseId] = index;
  localStorage.setItem(COURSE_PROGRESS, JSON.stringify(progress));
}

function saveLatestProgressInLocal(courseId: number, index: number) {
  const progress =
    JSON.parse(localStorage.getItem(COURSE_LATEST_PROGRESS)!) || {};
  const lastestProgress = progress[courseId] || 0;
  if (index > lastestProgress) {
    progress[courseId] = index;
    localStorage.setItem(COURSE_LATEST_PROGRESS, JSON.stringify(progress));
  }
}

export function useCourseProgress() {
  async function saveProgress(courseId: number, index: number) {
    saveProgressInLocal(courseId, index);
    saveLatestProgressInLocal(courseId, index);
  }

  function loadProgress(courseId: number) {
    const progress = JSON.parse(localStorage.getItem(COURSE_PROGRESS)!) || {};
    return progress[courseId] || 0;
  }

  function loadLatestProgress(courseId: number) {
    const progress = JSON.parse(localStorage.getItem(COURSE_LATEST_PROGRESS)!) || {};
    return progress[courseId] || 0;
  }

  function cleanProgress() {
    localStorage.removeItem(COURSE_PROGRESS);
  }

  return {
    saveProgress,
    loadProgress,
    cleanProgress,
    loadLatestProgress
  };
}
