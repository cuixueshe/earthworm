import type { Ref } from "vue";

import { debounce } from "lodash-es";
import { ref, watch } from "vue";

import type { Course } from "./course";
import { fetchUpdateCourseProgress } from "~/api/userCourseProgress";
import { isAuthenticated } from "~/services/auth";

const DEBOUNCE_TIME = 5000;
const INTERVAL_TIME = 60 * 1000 * 5;

let lastSavedIndex = 0;
let isSaveStatement = true;
const statementIndex = ref(0);

export function useStatement() {
  function setupStatement(course: Ref<Course | undefined>) {
    statementIndex.value = course.value!.statementIndex || 0;

    const debouncedSaveProgress = debounce(() => {
      saveProgress();

      lastSavedIndex = statementIndex.value;
    }, DEBOUNCE_TIME);

    watch(
      () => statementIndex.value,
      () => {
        if (isAuthenticated()) {
          debouncedSaveProgress();
        }
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
      if (!isSaveStatement) return;

      if (statementIndex.value !== lastSavedIndex) {
        fetchUpdateCourseProgress({
          coursePackId: course.value!.coursePackId,
          courseId: course.value!.id,
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

export function permitSaveStatement() {
  isSaveStatement = true;
}

export function preventSaveStatement() {
  isSaveStatement = false;
}
