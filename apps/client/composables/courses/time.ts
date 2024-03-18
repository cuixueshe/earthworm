import dayjs from "dayjs";
import { ref } from "vue";
import { useCourseStore } from "~/store/course";

export const COURSE_START_TIME = "courseStartTime";

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return (
    (hours ? `${hours}时` : "") +
    (minutes ? `${minutes}分` : "") +
    `${seconds}秒`
  );
};

const courseTimeSummary = ref("");

export function useCourseTime() {
  const statementIndex = ref<number>(0);

  function getCurrentCourse() {
    const courseStore = useCourseStore();
    return {
      index: courseStore.statementIndex,
      total: courseStore.totalQuestionsCount,
    };
  }

  function updateCourseTime() {
    const courseStartTime = Number(localStorage.getItem(COURSE_START_TIME));
    if (!!courseStartTime) return;
    localStorage.setItem(COURSE_START_TIME, String(dayjs().valueOf()));
    statementIndex.value = getCurrentCourse().index;
  }

  function restCourseTime() {
    localStorage.removeItem(COURSE_START_TIME);
    statementIndex.value = 0;
    courseTimeSummary.value = "";
  }

  function getCourseTime() {
    const startAt = Number(localStorage.getItem(COURSE_START_TIME));
    const endAt = dayjs().valueOf();
    const diff = startAt && endAt ? Math.floor((endAt - startAt) / 1000) : 0;
    const learnedCount = getCurrentCourse().total - statementIndex.value;
    courseTimeSummary.value = `恭喜您一共完成${learnedCount}道题，用时${formatTime(
      diff
    )}。`;
  }

  return {
    updateCourseTime,
    restCourseTime,
    getCourseTime,
    courseTimeSummary,
  };
}
