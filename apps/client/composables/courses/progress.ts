import {
  fetchCurrentCourseHistory,
  updateCourseProgress,
} from "~/api/courseHistory";

export const COURSE_PROGRESS = "courseProgress";

async function saveProgressInApi(courseId: number, index: number) {
  await updateProgressInApi(courseId, index);
}

async function updateProgressInApi(courseId: number, index: number = 0) {
  await updateCourseProgress({ courseId, currentIndex: index });
}

export function useCourseProgress() {
  async function saveProgress(courseId: number, index: number) {
    saveProgressInApi(courseId, index);
  }

  async function loadProgress(courseId: number) {
    const res = await fetchCurrentCourseHistory(courseId);
    return res.progress;
  }

  function cleanProgress() {
    localStorage.removeItem(COURSE_PROGRESS);
  }

  /**
   * 重置课程题目完成进度
   * @param courseId 课程id
   */
  async function resetProgress(courseId: number) {
    await updateProgressInApi(courseId);
  }

  return {
    saveProgress,
    loadProgress,
    cleanProgress,
    resetProgress,
  };
}
