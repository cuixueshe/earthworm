import { defineStore } from "pinia";
import { ref } from "vue";

import type { CoursePack2 } from "~/api/coursePack";
import { fetchCoursePack } from "~/api/coursePack";

export const useCoursePackStore = defineStore("course-pack", () => {
  const currentCoursePack = ref<CoursePack2>();

  async function setup(coursePackId: string) {
    const res = await fetchCoursePack(coursePackId);
    currentCoursePack.value = res;
  }

  return {
    setup,
    currentCoursePack,
  };
});
