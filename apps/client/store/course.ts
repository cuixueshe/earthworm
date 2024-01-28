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

  watchEffect(() => {
    currentStatement.value =
      currentCourse.value?.statements[statementIndex.value];
  });

  const wordCount = computed(() => {
    return currentStatement.value?.english.split(" ").length || 1;
  });

  const totalQuestionsCount = computed(() => {
    return currentCourse.value?.statements.length || 0;
  });

  function toNextStatement() {
    statementIndex.value = statementIndex.value + 1;

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
    return nextCourse
  }

  async function setup(courseId: number) {
    const course = await fetchCourse(courseId);
    currentCourse.value = course;
    statementIndex.value = 217;
  }

  return {
    statementIndex,
    currentCourse,
    currentStatement,
    wordCount,
    totalQuestionsCount,
    goToNextCourse: completeCourse,
    setup,
    doAgain,
    isAllDone,
    checkCorrect,
    toNextStatement,
  };
});
