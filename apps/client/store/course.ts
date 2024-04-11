import { defineStore } from "pinia";
import { computed, ref, watch, watchEffect } from "vue";
import { fetchCompleteCourse } from "~/api/course";
import lyric from "~/assets/music/demo.json";
import { useActiveCourseId } from "~/composables/courses/activeCourse";
import { useCourseProgress } from "~/composables/courses/progress";

interface Statement {
  id: number;
  chinese: string;
  english: string;
  soundmark?: string;
  [k: string]: any;
}

export interface Course {
  id: number;
  title: string;
  statements: Statement[];
  count?: number;
  [k: string]: any;
}

export const useCourseStore = defineStore("course", () => {
  const currentCourse = ref<Course>();
  const statementIndex = ref(0);
  const currentStatement = ref<Statement>();

  const { updateActiveCourseId } = useActiveCourseId();
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

  function toSpecificStatement(index: number) {
    statementIndex.value = index;
  }

  function toNextStatement() {
    const nextIndex = statementIndex.value + 1;
    statementIndex.value = nextIndex;

    return statementIndex.value;
  }

  function toPreviousStatement() {
    const prevIndex = statementIndex.value - 1;
    statementIndex.value = prevIndex >= 0 ? prevIndex : 0;

    return statementIndex.value;
  }

  function isAllDone() {
    // NOTE: 避免出现异常导致 statementIndex 越界无法完成当前课程的情况，只要大于等于当前题目长度就算完成啦
    return statementIndex.value + 1 >= totalQuestionsCount.value;
  }

  function doAgain() {
    resetStatementIndex();
    updateActiveCourseId(currentCourse.value?.id!);
  }

  function checkCorrect(input: string) {
    return (
      input.toLocaleLowerCase() ===
      currentStatement.value?.english.toLocaleLowerCase()
    );
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

    // const userStore = useUserStore();
    // if (!userStore.user) {
    //   let course = await fetchTryCourse();
    //   currentCourse.value = course;
    // } else {
    //   let course = await fetchCourse(courseId);
    //   currentCourse.value = course;
    // }

    currentCourse.value = {
      id: 1,
      title: "音乐模式测试课程",
      statements: lyric,
    };

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
    toSpecificStatement,
    toPreviousStatement,
  };
});
