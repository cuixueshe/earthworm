import { debounce } from "lodash-es";
import { ref, watch } from "vue";

import type { Course } from "./course";
import { fetchUpdateCourseProgress } from "~/api/userCourseProgress";

export function useStatement() {
  let lastSavedIndex = 0;
  const statementIndex = ref(0);

  function setupStatement(course: Course) {
    statementIndex.value = course.statementIndex;

    const debouncedSaveProgress = debounce(() => {
      saveProgress();

      lastSavedIndex = statementIndex.value;
    }, 5000);

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
    }, 300000); // 每5分钟自动保存一次

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
