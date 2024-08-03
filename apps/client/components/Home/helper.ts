import { ref } from "vue";

import { fetchUserRecentCoursePacks } from "~/api/user-course-progress";
import { type UserRecentCoursePack } from "~/types";

const coursePacks = ref<UserRecentCoursePack[]>([]);

export function useRecentCoursePack() {
  async function fetchCoursePacks() {
    coursePacks.value = await fetchUserRecentCoursePacks();
  }

  return {
    fetchCoursePacks,
    coursePacks,
  };
}
