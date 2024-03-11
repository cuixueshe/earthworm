import { computed, ref, watchEffect, watch } from "vue";
import { defineStore } from "pinia";
import { fetchCompleteCourse, fetchCourse, fetchTryCourse } from "~/api/course";
import { useUserStore } from "~/store/user";
import { useCourseProgress } from "~/composables/courses/progress";

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
  count?: number;
  progress?: string;
}

export const useCourseStore = defineStore("course", () => {
  const currentCourse = ref<Course>();
  const statementIndex = ref(0);
  const currentStatement = ref<Statement>();

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

  const words = computed(() => {
    return currentStatement.value?.english.split(" ") || [];
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
    // NOTE: 避免出现异常导致 statementIndex 越界无法完成当前课程的情况，只要大于等于当前题目长度就算完成啦
    return statementIndex.value + 1 >= currentCourse.value?.statements.length;
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
    // 这里只改变缓存的原因是 statementIndex 和 UI 是绑定的
    // 当完成课程的时候并不希望 UI 立刻被重置
    saveProgress(currentCourse.value?.id!, 0);
    return nextCourse;
  }

  async function setup(courseId: number) {
    if (courseId === currentCourse.value?.id) return;

    const userStore = useUserStore();
    if (!userStore.user) {
      let course = await fetchTryCourse();
      currentCourse.value = course;
    } else {
      let course = await fetchCourse(courseId);
      currentCourse.value = course;
    }

    statementIndex.value = loadProgress(courseId);
  }

  function resetStatementIndex() {
    statementIndex.value = 0;
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
    toNextStatement,
    cleanProgress,
    resetStatementIndex,
  };
});
