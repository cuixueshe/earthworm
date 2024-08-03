import { ref } from "vue";

import { fetchAllLearningTime, fetchTotalLearningTime } from "~/api/user-learning-activity";
import { type UserLearningDailyTime } from "~/types/models/user-learning-activity";

const learningDailyTimeList = ref<UserLearningDailyTime[]>([]);
const learningDailyTotalTime = ref(0);

export function useLearningDailyTime() {
  async function setupLearningDailyTime() {
    learningDailyTimeList.value = await fetchAllLearningTime();
    learningDailyTotalTime.value = await fetchTotalLearningTime();
  }

  return {
    learningDailyTimeList,
    learningDailyTotalTime,
    setupLearningDailyTime,
  };
}
