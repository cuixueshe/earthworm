import {
  fetchCurrentCourseHistory,
  updateCourseProgress,
} from "~/api/courseHistory";

export const COURSE_PROGRESS = "courseProgress";

async function saveProgressInLocal(courseId: number, index: number) {
  console.log("保存进度是多大dasd啊啥的啊");
  // const progress = JSON.parse(localStorage.getItem(COURSE_PROGRESS)!) || {};
  // progress[courseId] = index;
  // localStorage.setItem(COURSE_PROGRESS, JSON.stringify(progress));
  await updateProgressInLocal(courseId, index);
}

async function updateProgressInLocal(courseId: number, index: number = 1) {
  await updateCourseProgress({ courseId, currentIndex: index });
}

export function useCourseProgress() {
  async function saveProgress(courseId: number, index: number) {
    saveProgressInLocal(courseId, index);
  }

  async function loadProgress(courseId: number) {
    const res = await fetchCurrentCourseHistory(courseId);
    // const progress = JSON.parse(localStorage.getItem(COURSE_PROGRESS)!) || {};
    // return progress[courseId] || 0;

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
    await updateProgressInLocal(courseId);
  }

  return {
    saveProgress,
    loadProgress,
    cleanProgress,
    resetProgress,
  };
}
