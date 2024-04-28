import { defineStore } from "pinia";
import { ref } from "vue";

import type { CoursePackResponse } from "~/api/coursePack";
import { fetchCoursePack } from "~/api/coursePack";

export interface CoursePack {
  id: string;
  order: number;
  title: string;
  description: string;
  isFree: boolean;
}

export const useCoursePackStore = defineStore("course-pack", () => {
  const currentCoursePack = ref<CoursePackResponse>();

  async function setup(coursePackId: string) {
    const res = await fetchCoursePack(coursePackId);
    currentCoursePack.value = res;
  }

  return {
    setup,
    currentCoursePack,
  };
});
