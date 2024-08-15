import { ref } from "vue";

const contentsVisible = ref(false);

export function useCourseContents() {
  function openCourseContents() {
    contentsVisible.value = true;
  }

  function hideCourseContents() {
    contentsVisible.value = false;
  }

  return {
    contentsVisible,
    openCourseContents,
    hideCourseContents,
  };
}
