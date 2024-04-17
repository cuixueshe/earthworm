import { defineStore } from "pinia";
import { computed, ref, watch, watchEffect } from "vue";

import { fetchCompleteCourse, fetchCourse, fetchTryCourse } from "~/api/course";
// import lyric from "~/assets/music/demo.json";
import { useActiveCourseId } from "~/composables/courses/activeCourse";
import { useCourseProgress } from "~/composables/courses/progress";
import { isAuthenticated } from "~/services/auth";

interface Statement {
  id: number;
  chinese: string;
  english: string;
  soundmark?: string;
  startTime?: string;
  endTime?: string;
}

export interface Course {
  id: number;
  title: string;
  statements: Statement[];
  count?: number;
}

export const useCourseStore = defineStore("course", () => {
  const currentCourse = ref<Course>();
  const statementIndex = ref(0);
  const currentStatement = ref<Statement>();

  const { updateActiveCourseId } = useActiveCourseId();
  const { saveProgress, loadProgress, cleanProgress } = useCourseProgress();

  watchEffect(() => {
    currentStatement.value = currentCourse.value?.statements[statementIndex.value];
  });

  watch(
    () => statementIndex.value,
    () => {
      saveProgress(currentCourse.value?.id!, statementIndex.value);
    },
  );

  const words = computed(() => {
    return currentStatement.value?.english.split(" ") || [];
  });

  const totalQuestionsCount = computed(() => {
    return currentCourse.value?.statements.length || 0;
  });

  function toSpecificStatement(index: number) {
    statementIndex.value = index;
  }

  function toPreviousStatement() {
    statementIndex.value = Math.max(0, statementIndex.value - 1);
  }

  function toNextStatement() {
    statementIndex.value = Math.min(statementIndex.value + 1, totalQuestionsCount.value - 1);
  }

  function resetStatementIndex() {
    statementIndex.value = 0;
  }

  function isAllDone() {
    return statementIndex.value >= totalQuestionsCount.value - 1;
  }

  function doAgain() {
    resetStatementIndex();
    updateActiveCourseId(currentCourse.value?.id!);
  }

  function checkCorrect(input: string) {
    return input.toLocaleLowerCase() === currentStatement.value?.english.toLocaleLowerCase();
  }

  async function completeCourse(cId: number) {
    const res = await fetchCompleteCourse(cId);
    // 这里只改变缓存的原因是 statementIndex 和 UI 是绑定的
    // 当完成课程的时候并不希望 UI 立刻被重置
    saveProgress(currentCourse.value?.id!, 0);
    return res;
  }

  async function setup(courseId: number) {
    if (courseId === currentCourse.value?.id) return;

    if (!isAuthenticated()) {
      let course = await fetchTryCourse();
      currentCourse.value = course;
    } else {
      let course = await fetchCourse(courseId);
      currentCourse.value = course;
    }

    statementIndex.value = loadProgress(courseId);
  }

  function setupMusic(course: Course) {
    currentCourse.value = course;
    resetStatementIndex();
  }

  return {
    statementIndex,
    currentCourse,
    currentStatement,
    words,
    totalQuestionsCount,
    setup,
    doAgain,
    isAllDone,
    checkCorrect,
    completeCourse,
    cleanProgress,
    toSpecificStatement,
    toPreviousStatement,
    toNextStatement,
    resetStatementIndex,

    setupMusic,
  };
});
