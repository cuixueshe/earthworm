import { defineStore } from "pinia";
import { fetchCourse, fetchNextCourse } from "~/api/courses";

interface Statement {
  id: number;
  chinese: string;
  english: string;
  soundmark: string;
}

type Course = { id: number; title: string; statements: Statement[] };

export const useCoursesStore = defineStore("courses", () => {
  const currentCourse = ref<Course>();
  const statementIndex = ref(0);
  const currentStatement = ref<Statement>();

  watchEffect(() => {
    currentStatement.value =
      currentCourse.value?.statements[statementIndex.value];
  });

  function toNextStatement() {
    statementIndex.value = statementIndex.value + 1;

    return statementIndex.value;
  }

  function isAllDone() {
    return statementIndex.value + 1 === currentCourse.value.statements.length;
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

  async function toNextCourse(cId: number) {
    const nextCourse = await fetchNextCourse(cId);
    currentCourse.value = nextCourse.value;
    statementIndex.value = 0;
    return currentCourse
  }

  async function setup(courseId: number) {
    // 1. 基于用户 id ，获取当前的 course id
    // 2. 没登录的话 直接获取第一个 course id
    console.log(courseId)
    const course = await fetchCourse(courseId);
    currentCourse.value = course.value;
    statementIndex.value = 0;
  }

  return {
    statementIndex,
    currentCourse,
    currentStatement,
    toNextCourse,
    setup,
    doAgain,
    isAllDone,
    checkCorrect,
    toNextStatement,
  };
});
