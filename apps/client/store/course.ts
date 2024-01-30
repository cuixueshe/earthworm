import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchCompleteCourse, fetchCourse } from "~/api/course";

interface Statement {
  id: number;
  chinese: string;
  english: string;
  soundmark: string;
}

export interface Course {
  id: number;
  title: string;
  statements: Statement[];
}

export const useCourseStore = defineStore("course", () => {
  const currentCourse = ref<Course>();
  const statementIndex = ref(0);
  const currentStatement = ref<Statement>();
  // 新增状态：用于保存当前文本框中的光标位置
  const cursorPosition = ref<number | null>(null);
  // 新增状态：标志是否需要恢复光标位置
  const shouldRestoreCursor = ref(false);

  const { saveProgress, loadProgress, cleanProgress } = useCourseProgress();

  watchEffect(() => {
    currentStatement.value =
      currentCourse.value?.statements[statementIndex.value];
  });

  watch(
    () => statementIndex.value,
    () => {
      saveProgress(currentCourse.value?.id!, statementIndex.value);
    }
  );

  const wordCount = computed(() => {
    return currentStatement.value?.english.split(" ").length || 1;
  });

  const totalQuestionsCount = computed(() => {
    return currentCourse.value?.statements.length || 0;
  });

  function toNextStatement() {
    const nextIndex = statementIndex.value + 1;
    statementIndex.value = nextIndex;

    return statementIndex.value;
  }

  function isAllDone() {
    return statementIndex.value + 1 === currentCourse.value?.statements.length;
  }

  function doAgain() {
    resetStatementIndex();
  }

  function checkCorrect(input: string) {
    return (
      input.toLocaleLowerCase() ===
      currentStatement.value?.english.toLocaleLowerCase()
    );
  }

  async function completeCourse(cId: number) {
    const nextCourse = await fetchCompleteCourse(cId);
    resetStatementIndex();
    return nextCourse;
  }

  async function setup(courseId: number) {
    const course = await fetchCourse(courseId);
    currentCourse.value = course;
    statementIndex.value = loadProgress(courseId);
  }

  function resetStatementIndex() {
    statementIndex.value = 0;
  }
// 新增方法：保存光标位置
  function saveCursorPosition(position: number) {
    cursorPosition.value = position;
  }
// 新增方法：触发光标位置恢复的标志
  function triggerCursorRestore() {
    shouldRestoreCursor.value = true;
  }
// 新增方法：重置光标位置恢复的标志
  function resetCursorRestore() {
    shouldRestoreCursor.value = false;
  }

  return {
    statementIndex,
    currentCourse,
    currentStatement,
    wordCount,
    totalQuestionsCount,
    setup,
    doAgain,
    isAllDone,
    checkCorrect,
    completeCourse,
    toNextStatement,
    cleanProgress,
    resetStatementIndex,
    cursorPosition,
    shouldRestoreCursor,
    saveCursorPosition,
    triggerCursorRestore,
    resetCursorRestore,
  };
});

function useCourseProgress() {
  function saveProgress(courseId: number, index: number) {
    const progress = JSON.parse(localStorage.getItem("courseProgress")!) || {};
    progress[courseId] = index;
    localStorage.setItem("courseProgress", JSON.stringify(progress));
  }

  function loadProgress(courseId: number) {
    const progress = JSON.parse(localStorage.getItem("courseProgress")!) || {};
    return progress[courseId] || 0;
  }

  function cleanProgress() {
    localStorage.removeItem("courseProgress");
  }

  return {
    saveProgress,
    loadProgress,
    cleanProgress,
  };
}
