import { ref } from "vue";

import type { UserRecentCoursePackResponse } from "~/api/userCourseProgress";
import { fetchUserRecentCoursePacks } from "~/api/userCourseProgress";

const coursePacks = ref<UserRecentCoursePackResponse[]>([]);

export function useRecentCoursePack() {
  async function fetchCoursePacks() {
    coursePacks.value = await fetchUserRecentCoursePacks();
  }

  return {
    fetchCoursePacks,
    coursePacks,
  };
}
