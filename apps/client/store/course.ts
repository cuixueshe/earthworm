import { defineStore } from "pinia";
import { computed, ref, watch, watchEffect } from "vue";

import { fetchCompleteCourse, fetchCourse } from "~/api/course";
import { useActiveCourseMap } from "~/composables/courses/activeCourse";
import { useStatement } from "./statement";

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
  coursePackId: number;
  completionCount: number;
  statementIndex: number;
}

export const useCourseStore = defineStore("course", () => {
  const currentCourse = ref<Course>();
  const currentStatement = ref<Statement>();
  const { statementIndex, setupStatement } = useStatement();

  const { updateActiveCourseMap } = useActiveCourseMap();

  watchEffect(() => {
    currentStatement.value = currentCourse.value?.statements[statementIndex.value];
  });

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
    updateActiveCourseMap(currentCourse.value?.coursePackId!, currentCourse.value?.id!);
  }

  function checkCorrect(input: string) {
    return input.toLocaleLowerCase() === currentStatement.value?.english.toLocaleLowerCase();
  }

  async function completeCourse() {
    const res = await fetchCompleteCourse(
      currentCourse.value?.coursePackId!,
      currentCourse.value?.id!,
    );

    return res;
  }

  async function setup(coursePackId: number, courseId: number) {
    let course = await fetchCourse(coursePackId, courseId);
    currentCourse.value = course;
    setupStatement(currentCourse);
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
    toSpecificStatement,
    toPreviousStatement,
    toNextStatement,
    resetStatementIndex,
  };
});
