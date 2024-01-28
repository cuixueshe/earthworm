import { useUserStore } from "~/store/user";
import { fetchUpdateProgress, fetchUserProgress } from "~/api/userProgress";
import { fetchStartCourse } from "~/api/course";

export const ACTIVE_COURSE_ID = "activeCourseId";
export function useUserProgress() {
  const activeCourseId = ref(1);

  const initing = ref(false);
  const initProgress = async () => {
    initing.value = true;
    const { courseId } = await fetchUserProgress();
    if (courseId) {
      activeCourseId.value = +courseId;
      updateProgressLocal(+courseId);
    }
    initing.value = false;
  };

  const updateProgress = async (courseId: number) => {
    const { courseId: updatedCourseId } = await fetchUpdateProgress({
      courseId,
    });
    updateProgressLocal(updatedCourseId);
  };

  const updateProgressLocal = async (courseId: number) => {
    localStorage.setItem(ACTIVE_COURSE_ID, `${courseId}`);
  };

  return {
    activeCourseId,
    initing,
    updateProgressLocal,
    updateProgress,
    initProgress,
  };
}

export async function startCourse() {
  const userStore = useUserStore();
  const firstCourseId = 1;

  let courseId;
  if (!userStore.user) {
    courseId = firstCourseId;
  } else {
    const { cId } = await fetchStartCourse();
    courseId = cId;
  }

  return {
    courseId,
  };
}
