import { defineStore } from "pinia";
import { computed, ref, watchEffect } from "vue";

import type { Course, Statement } from "~/types";
import { fetchCompleteCourse, fetchCourse } from "~/api/course";
import { useActiveCourseMap } from "~/composables/courses/activeCourse";
import { isAuthenticated } from "~/services/auth";
import { useMasteredElementsStore } from "~/store/masteredElements";
import { useStatement } from "./statement";

export const useCourseStore = defineStore("course", () => {
  const currentCourse = ref<Course>();
  const currentStatement = ref<Statement>();
  const { statementIndex, setupAutoSaveProgress } = useStatement();
  const masteredElementsStore = useMasteredElementsStore();

  const { updateActiveCourseMap } = useActiveCourseMap();

  watchEffect(() => {
    currentStatement.value = currentCourse.value?.statements[statementIndex.value];
  });

  const words = computed(() => {
    return currentStatement.value?.english.split(" ") || [];
  });

  const visibleStatementsCount = computed(
    () => currentCourse.value?.statements.filter((s) => !s.isMastered).length || 0,
  );

  const visibleStatementIndex = computed(() => {
    let masteredCount = 0;
    currentCourse.value?.statements.forEach((statement, index) => {
      if (index < statementIndex.value) {
        if (statement.isMastered) {
          masteredCount++;
        }
      }
    });

    if (statementIndex.value - masteredCount >= visibleStatementsCount.value) {
      return statementIndex.value - masteredCount - 1;
    }

    return statementIndex.value - masteredCount;
  });

  const totalQuestionsCount = computed(() => {
    return currentCourse.value?.statements.length || 0;
  });

  function toSpecificStatement(index: number) {
    statementIndex.value = index;
  }

  function findNextUnmasteredIndex(currentIndex: number, direction: 1 | -1) {
    let index = currentIndex;
    while (index >= 0 && index < totalQuestionsCount.value) {
      index += direction;
      if (
        index >= 0 &&
        index < totalQuestionsCount.value &&
        !currentCourse.value!.statements[index].isMastered
      ) {
        return index;
      }
    }
    return -1; // 没有找到未掌握的元素
  }

  function toPreviousStatement() {
    const prevIndex = findNextUnmasteredIndex(statementIndex.value, -1);
    if (prevIndex !== -1) {
      statementIndex.value = prevIndex;
    }
  }

  function toNextStatement() {
    const nextIndex = findNextUnmasteredIndex(statementIndex.value, 1);
    if (nextIndex !== -1) {
      statementIndex.value = nextIndex;
    }
  }

  function resetStatementIndex() {
    const firstIndex = findFirstUnmasteredIndex();
    if (firstIndex !== -1) {
      statementIndex.value = firstIndex;
    }
  }

  function isAllDone() {
    return visibleStatementIndex.value >= visibleStatementsCount.value - 1;
  }

  function isLastStatement() {
    return visibleStatementIndex.value + 1 === visibleStatementsCount.value;
  }

  function isAllMastered() {
    return visibleStatementsCount.value === 0;
  }

  function updateMarketedStatements() {
    if (currentCourse.value) {
      currentCourse.value.statements = markMasteredElements(currentCourse.value.statements);
    }
  }

  function findFirstUnmasteredIndex() {
    if (!currentCourse.value) return 0;
    return currentCourse.value.statements.findIndex((statement) => !statement.isMastered);
  }

  function doAgain() {
    resetStatementIndex();
    updateActiveCourseMap(currentCourse.value?.coursePackId!, currentCourse.value?.id!);
  }

  async function completeCourse() {
    const coursePackId = currentCourse.value?.coursePackId!;
    const res = await fetchCompleteCourse(coursePackId, currentCourse.value?.id!);
    return res;
  }

  async function setup(coursePackId: string, courseId: string) {
    let course = await fetchCourse(coursePackId, courseId);

    course.statements = markMasteredElements(course.statements);

    currentCourse.value = course;
    if (isAuthenticated()) {
      setupAutoSaveProgress(currentCourse);
      if (statementIndex.value === 0) {
        resetStatementIndex();
      }
    }
  }

  function markMasteredElements(statements: Statement[]) {
    return statements.map((statement) => {
      const isMastered = masteredElementsStore.checkMastered(statement.english);

      return {
        ...statement,
        isMastered,
      };
    });
  }

  return {
    statementIndex,
    currentCourse,
    currentStatement,
    words,
    totalQuestionsCount,
    visibleStatementIndex,
    visibleStatementsCount,
    setup,
    doAgain,
    isAllDone,
    completeCourse,
    toSpecificStatement,
    toPreviousStatement,
    toNextStatement,
    resetStatementIndex,
    updateMarketedStatements,
    isLastStatement,
    isAllMastered,
  };
});
