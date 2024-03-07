import { fetchCourseProgress } from "~/api/courseHistory";

export const COURSE_PROGRESS = "courseProgress";

async function saveProgressInApi(
  courseId: number,
  index: number,
  total: number
) {
  let ratio = index / total;
  // 如果是0，认定该节课已完成
  if (ratio == 0) {
    ratio = 1;
  }
  const progressNum = `${parseFloat((ratio * 100).toFixed(2))}%`;
  await fetchCourseProgress(courseId, progressNum);
}

function saveProgressInLocal(courseId: number, index: number) {
  const progress = JSON.parse(localStorage.getItem(COURSE_PROGRESS)!) || {};
  progress[courseId] = index;
  localStorage.setItem(COURSE_PROGRESS, JSON.stringify(progress));
}

export function useCourseProgress() {
  async function saveProgress(courseId: number, index: number, total: number) {
    saveProgressInLocal(courseId, index);
    await saveProgressInApi(courseId, index, total);
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
