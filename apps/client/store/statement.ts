import { debounce } from "lodash-es";
import { ref, watch } from "vue";

import type { Course } from "./course";
import { fetchUpdateCourseProgress } from "~/api/userCourseProgress";

const DEBOUNCE_TIME = 5000;
const INTERVAL_TIME = 60 * 1000 * 5;

let lastSavedIndex = 0;
const statementIndex = ref(0);

export function useStatement() {
  function setupStatement(course: Course) {
    statementIndex.value = course.statementIndex;

    const debouncedSaveProgress = debounce(() => {
      saveProgress();

      lastSavedIndex = statementIndex.value;
    }, DEBOUNCE_TIME);

    watch(
      () => statementIndex.value,
      () => {
        debouncedSaveProgress();
      },
    );

    // 窗口关闭前保存
    window.addEventListener("beforeunload", () => {
      saveProgress();
    });

    // 页面失去焦点时保存
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        saveProgress();
      }
    });

    // 设置间隔性自动保存
    setInterval(() => {
      saveProgress();
    }, INTERVAL_TIME); // 每5分钟自动保存一次

    function saveProgress() {
      if (statementIndex.value !== lastSavedIndex) {
        fetchUpdateCourseProgress({
          coursePackId: course.coursePackId,
          courseId: course.id,
          statementIndex: statementIndex.value,
        });
      }
    }
  }

  return {
    setupStatement,
    statementIndex,
  };
}
