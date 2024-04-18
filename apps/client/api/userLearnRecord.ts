import type { AxiosRequestConfig } from "axios";

import { http } from "./http";

interface UserLearnRecordDto {
  startDate?: string;
  endDate?: string;
}

interface UserLearnRecordVo {
  totalCount: number;
  list: Array<{ date: string; count: number }>;
}

export async function fetchLearnRecord(params: UserLearnRecordDto) {
  return await http.get<UserLearnRecordVo, UserLearnRecordVo>(`/user-learn-record/finishCount`, {
    params,
  });
}
