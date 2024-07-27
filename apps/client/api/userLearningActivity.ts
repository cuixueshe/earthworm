import { type LearningTimeApiResponse } from "~/types/api/user-learning-activity.js";
import { http } from "./http";

interface UpdateLearningTimeParams {
  date: string;
  duration: number;
}

export async function updateDailyLearningDailyTotalTime(
  params: UpdateLearningTimeParams,
): Promise<void> {
  await http.post<void, void>("/user-learning-activities", {
    ...params,
    activityType: "daily_total",
  });
}

export async function fetchTodayLearningTime() {
  const learningTimeList = await http.get<LearningTimeApiResponse[], LearningTimeApiResponse[]>(
    "/user-learning-activities",
    {
      params: {
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
        activityType: "daily_total",
      },
    },
  );

  if (learningTimeList.length === 0) {
    return 0;
  }

  return learningTimeList[0].duration;
}

export async function fetchAllLearningTime() {
  const learningTimeList = await http.get<LearningTimeApiResponse[], LearningTimeApiResponse[]>(
    "/user-learning-activities",
    {
      params: {
        activityType: "daily_total",
      },
    },
  );

  return learningTimeList;
}

/**获取总的学习时长 */
export async function fetchTotalLearningTime() {
  const totalLearningTime = await http.get<number, number>("/user-learning-activities/total", {
    params: {
      activityType: "daily_total",
    },
  });

  return totalLearningTime;
}
