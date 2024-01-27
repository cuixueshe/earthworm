import { fetchUpdateProgress, fetchUserProgress } from "~/api/userProgress"

export const ACTIVE_COURSE_ID = 'activeCourseId'
export function useUserProgress() {

  const activeCourseId = ref(1)

  const initing = ref(false)
  const initProgress = async () => {
    initing.value = true
    const { courseId } = await fetchUserProgress()
    if (courseId) {
      activeCourseId.value = +courseId
      updateProgressLocal(+courseId)
    }
    initing.value = false
  }

  const updateProgress = async (courseId: number) => {
    const { courseId: updatedCourseId } = await fetchUpdateProgress({courseId}) 
    updateProgressLocal(updatedCourseId)
  }

  const updateProgressLocal = async (courseId: number) => {
    localStorage.setItem(ACTIVE_COURSE_ID, `${courseId}`)
  }
  
  return {
    activeCourseId,
    initing,
    updateProgressLocal,
    updateProgress,
    initProgress
  }
}