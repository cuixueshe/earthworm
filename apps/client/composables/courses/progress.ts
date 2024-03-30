import {
  fetchCurrentCourseHistory,
  updateCourseProgress,
} from "~/api/courseHistory";

export const COURSE_PROGRESS = "courseProgress";

async function saveProgressInApi(courseId: number, index: number) {
  await updateCourseProgress({ courseId, currentIndex: index });
}

function saveProgressInLocal(courseId: number, index: number) {
  const progress = JSON.parse(localStorage.getItem(COURSE_PROGRESS)!) || {};
  progress[courseId] = index;
  localStorage.setItem(COURSE_PROGRESS, JSON.stringify(progress));
}

function loadProgressInLocal(courseId: number) {
  const progress = JSON.parse(localStorage.getItem(COURSE_PROGRESS)!) || {};
  return progress[courseId] || 0;
}

async function loadProgressInApi(courseId: number) {
  const res = await fetchCurrentCourseHistory(courseId);
  return res.progress;
}

export function useCourseProgress() {
  async function saveProgress(
    courseId: number,
    index: number,
    isLogin: boolean = false
  ) {
    saveProgressInLocal(courseId, index);
    isLogin && saveProgressInApi(courseId, index);
  }

  function loadProgress(courseId: number, isLogin: boolean = false) {
    return isLogin
      ? loadProgressInApi(courseId)
      : loadProgressInLocal(courseId);
  }

  function cleanProgress() {
    localStorage.removeItem(COURSE_PROGRESS);
  }

  /**
   * 重置课程题目完成进度
   * @param courseId 课程id
   */
  async function resetProgress(courseId: number) {
    await saveProgressInApi(courseId, 0);
  }

  return {
    saveProgress,
    loadProgress,
    cleanProgress,
    resetProgress,
  };
}
