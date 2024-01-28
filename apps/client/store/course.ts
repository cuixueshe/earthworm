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
    statementIndex.value = 0;
  }

  function checkCorrect(input: string) {
    return (
      input.toLocaleLowerCase() ===
      currentStatement.value?.english.toLocaleLowerCase()
    );
  }

  async function completeCourse(cId: number) {
    const nextCourse = await fetchCompleteCourse(cId);
    statementIndex.value = 0;
    return nextCourse;
  }

  async function setup(courseId: number) {
    const course = await fetchCourse(courseId);
    currentCourse.value = course;
    statementIndex.value = loadProgress(courseId);
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
