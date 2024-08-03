import type { UserLearningDailyTime } from "~/types/models/user-learning-activity";
import { getHttp } from "./http";

export interface LearningTimeApiResponse {
  date: string;
  duration: number;
}

interface UpdateLearningTimeParams {
  date: string;
  duration: number;
}

export async function updateDailyLearningDailyTotalTime(params: UpdateLearningTimeParams) {
  const http = getHttp();
  return await http<boolean>("/user-learning-activities", {
    method: "post",
    body: {
      ...params,
      activityType: "daily_total",
    },
  });
}

export async function fetchTodayLearningTime() {
  const http = getHttp();
  const learningTimeList = await http<LearningTimeApiResponse[]>("/user-learning-activities", {
    method: "get",
    params: {
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      activityType: "daily_total",
    },
  });

  if (learningTimeList.length === 0) {
    return 0;
  }

  return learningTimeList[0].duration;
}

export async function fetchAllLearningTime() {
  const http = getHttp();
  return (await http<LearningTimeApiResponse[]>("/user-learning-activities", {
    method: "get",
    params: {
      activityType: "daily_total",
    },
  })) as UserLearningDailyTime[];
}

/**获取总的学习时长 */
export async function fetchTotalLearningTime() {
  const http = getHttp();
  const result = await http<number>("/user-learning-activities/total", {
    method: "get",
    params: {
      activityType: "daily_total",
    },
  });

  return Number(result);
}
