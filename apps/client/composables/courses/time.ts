import { ref } from "vue";
import { db } from "~/utils/dexieDB";
import dayjs from "dayjs";

function formatTime(time: number) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return (
    (hours ? `${hours}小时` : "") +
    (minutes ? `${minutes}分钟` : "") +
    `${seconds}秒`
  );
}

async function saveStartAt(courseId: number) {
  await db.addCourse({
    courseId,
    startAt: dayjs().valueOf(),
    endAt: 0,
    time: 0,
  });
}

export function useCourseTime() {
  const courseTime = ref("");

  // 存储开始时间
  async function saveStartTime(courseId: number) {
    const course = await db.queryCourse(courseId);
    if (course && course.id) {
      // 重新计时
      if (course.startAt === 0) {
        await db.updateCourse({
          ...course,
          startAt: dayjs().valueOf(),
        });
      }
      return;
    }
    await saveStartAt(courseId);
  }

  async function saveEndAt(courseId: number) {
    const course = await db.queryCourse(courseId);
    await db.updateCourse({
      ...course,
      endAt: dayjs().valueOf(),
    });
  }

  // 离开游戏
  async function pauseTiming(courseId: number) {
    const course = await db.queryCourse(courseId);
    if (course && course.id) {
      debugger;
      // 1. 存储结束时间
      await saveEndAt(courseId);
      // 2. 重置开始时间0
      await db.updateCourse({
        ...course,
        startAt: 0,
      });
    }
  }

  async function getCourseTime(courseId: number) {
    const { time } = await db.queryCourse(courseId);
    return formatTime(time);
  }

  async function stopTiming(courseId: number) {
    await saveEndAt(courseId);
    courseTime.value = await getCourseTime(courseId);
  }

  async function cleanCourseTime(courseId: number) {
    await db.deleteCourse(courseId);
  }

  return {
    saveStartTime,
    pauseTiming,
    stopTiming,
    courseTime,
    cleanCourseTime,
    getCourseTime,
  };
}
