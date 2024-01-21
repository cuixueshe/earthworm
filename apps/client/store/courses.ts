import { defineStore } from "pinia";

interface Statement {
  id: number;
  chinese: string;
  english: string;
  soundmark: string;
}

type Course = { statements: Statement[] };

export const useCoursesStore = defineStore("courses", () => {
  const currentCourse = ref<Course>();
  const statementIndex = ref(0);
  const currentStatement = computed(() => {
    return currentCourse.value?.statements[statementIndex.value];
  })

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

  async function fetchCourseData(courseId: string) {
    const courseData = {
      "1": {
        title: "第一课",
        statements: [
          {
            id: 1,
            chinese: "我",
            english: "I",
            soundmark: "/aɪ/",
          },
          {
            id: 2,
            chinese: "不",
            english: "don't",
            soundmark: "/dont/",
          },
        ],
      },
    };

    currentCourse.value = courseData[courseId];
  }

  return {
    statementIndex,
    currentCourse,
    currentStatement,
    fetchCourseData,
    checkCorrect,
    toNextStatement,
  };
});
