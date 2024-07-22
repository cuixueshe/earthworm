import { ref } from "vue";

import { fetchUserRecentCoursePacks } from "~/api/userCourseProgress";
import { type UserRecentCoursePackApiResponse } from "~/types";

const coursePacks = ref<UserRecentCoursePackApiResponse[]>([]);

export function useRecentCoursePack() {
  async function fetchCoursePacks() {
    coursePacks.value = await fetchUserRecentCoursePacks();
  }

  return {
    fetchCoursePacks,
    coursePacks,
  };
}
