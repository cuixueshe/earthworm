import { defineStore } from "pinia";
import { fetchCourse } from "~/api/courses";

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

  function checkCorrect(input: string) {
    return (
      input.toLocaleLowerCase() ===
      currentStatement.value?.english.toLocaleLowerCase()
    );
  }

  async function setup(courseId: number) {
    const course = await fetchCourse(courseId);
    currentCourse.value = course.value;
  }


  return {
    statementIndex,
    currentCourse,
    currentStatement,
    setup,
    checkCorrect,
    toNextStatement,
  };
});
