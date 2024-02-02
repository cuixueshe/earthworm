import { computed, ref, watchEffect, watch } from 'vue';
import { defineStore } from 'pinia';
import { fetchCompleteCourse, fetchCourse } from '~/api/course';

interface Statement {
  id: number;
  chinese: string;
  english: string;
  soundmark: string;
  incorrectQuestionId?: number;
}

export interface Course {
  id: number;
  title: string;
  statements: Statement[];
}

export const useCourseStore = defineStore('course', () => {
  const currentCourse = ref<Course>();
  const statementIndex = ref(0);
  const currentStatement = ref<Statement>();

  const { saveProgress, loadProgress, cleanProgress } = useCourseProgress();
  const { saveIncorrectQuestion, loadIncorrectQuestion, cleanIncorrectQuestion, convertQuestionData } = useIncorrectQuestion()

  watchEffect(() => {
    currentStatement.value = currentCourse.value?.statements[statementIndex.value];
  });

  watch(
    () => statementIndex.value,
    () => {
      saveProgress(currentCourse.value?.id!, statementIndex.value);
    },
  );

  const wordCount = computed(() => {
    return currentStatement.value?.english.split(' ').length || 1;
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
    return input.toLocaleLowerCase() === currentStatement.value?.english.toLocaleLowerCase();
  }

  async function completeCourse(cId: number) {
    const nextCourse = await fetchCompleteCourse(cId);
    // 这里只改变缓存的原因是 statementIndex 和 UI 是绑定的
    // 当完成课程的时候并不希望 UI 立刻被重置
    saveProgress(currentCourse.value?.id!, 0);
    return nextCourse;
  }

  async function setup(courseId: number) {
    const course = await fetchCourse(courseId);
    currentCourse.value = course;
    currentCourse.value.statements = [...currentCourse.value.statements, ...loadIncorrectQuestion(courseId)]
    statementIndex.value = loadProgress(courseId);
  }

  function resetStatementIndex() {
    statementIndex.value = 0;
  }

  function updateIncorrectQuestions() {
    let currentIncorrectQuestion: Statement = convertQuestionData(currentStatement.value)
    const mistakeIsExist = currentCourse?.value.statements.some(
      (item: Statement) =>
        item.incorrectQuestionId ===
        currentIncorrectQuestion.incorrectQuestionId
    );
    if (!mistakeIsExist) {
      currentCourse?.value.statements.push(currentIncorrectQuestion);
      saveIncorrectQuestion(currentCourse?.value.id, currentIncorrectQuestion);
    }
  }
  function resetCurrentCourse(courseId: number) {
    if(currentCourse.value?.statements.length) {
      currentCourse.value.statements = currentCourse.value?.statements.filter(((item: Statement) => !item.incorrectQuestionId))
    }
    cleanIncorrectQuestion(courseId)
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
    resetStatementIndex,
    resetCurrentCourse,
    convertQuestionData,
    updateIncorrectQuestions,
  };
});

const COURSE_PROGRESS = 'courseProgress';
function useCourseProgress() {
  function saveProgress(courseId: number, index: number) {
    const progress = JSON.parse(localStorage.getItem(COURSE_PROGRESS)!) || {};
    progress[courseId] = index;
    localStorage.setItem(COURSE_PROGRESS, JSON.stringify(progress));
  }

  function loadProgress(courseId: number) {
    const progress = JSON.parse(localStorage.getItem(COURSE_PROGRESS)!) || {};
    return progress[courseId] || 0;
  }

  function cleanProgress() {
    localStorage.removeItem(COURSE_PROGRESS);
  }

  return {
    saveProgress,
    loadProgress,
    cleanProgress,
  };
}

function useIncorrectQuestion() {
  function saveIncorrectQuestion(courseId: number, question: Statement) {
    const courseIncorrectQuestion = JSON.parse(localStorage.getItem("courseIncorrectQuestion")!) || {};
    const currentQuestions = courseIncorrectQuestion[courseId] || [];
    courseIncorrectQuestion[courseId] = [...currentQuestions, question];
    localStorage.setItem("courseIncorrectQuestion", JSON.stringify(courseIncorrectQuestion));
  }
  function loadIncorrectQuestion(courseId: number) {
    const question = JSON.parse(localStorage.getItem("courseIncorrectQuestion")!) || {};
    return question[courseId] || [];
  }
  function cleanIncorrectQuestion(courseId?: number) {
    if(!courseId) {
      localStorage.removeItem("courseIncorrectQuestion");
    } else {
      const courseIncorrectQuestion = JSON.parse(localStorage.getItem("courseIncorrectQuestion")!) || {};
      courseIncorrectQuestion[courseId] && delete courseIncorrectQuestion[courseId]
      localStorage.setItem("courseIncorrectQuestion", JSON.stringify(courseIncorrectQuestion));
    }
  }
  function convertQuestionData(statement: Statement) {
    let currentIncorrectQuestion: Statement = JSON.parse(JSON.stringify(statement));
    currentIncorrectQuestion.id = new Date().getTime();
    currentIncorrectQuestion.incorrectQuestionId = statement?.id;
    return currentIncorrectQuestion
  }
  return {
    saveIncorrectQuestion,
    loadIncorrectQuestion,
    cleanIncorrectQuestion,
    convertQuestionData,
  }
}