import { ref } from "vue";

import type { UserRecentCoursePackResponse } from "~/api/userCourseProgress";
import { fetchUserRecentCoursePacksByUserId } from "~/api/userCourseProgress";

const coursePacks = ref<UserRecentCoursePackResponse[]>([]);

interface UseRecentCoursePackOptions {
  userId: string;
  limit?: number;
}

export function useRecentCoursePack(options: UseRecentCoursePackOptions) {
  const { userId, limit = 4 } = options || {};

  async function fetchCoursePacks() {
    coursePacks.value = await fetchUserRecentCoursePacksByUserId(userId, limit);
  }

  return {
    fetchCoursePacks,
    coursePacks,
  };
}
