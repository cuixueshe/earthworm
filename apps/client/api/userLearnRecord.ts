import { http } from "./http";

interface UserLearnRecordDto {
  startDate?: string;
  endDate?: string;
}

interface UserLearnRecordVo {
  totalCount: number;
  list: Array<{ day: string; count: number }>;
}

export async function fetchLearnRecord(params: UserLearnRecordDto) {
  return await http.get<UserLearnRecordDto, UserLearnRecordVo>(`/user-learn-record/finishCount`, {
    params,
  });
}
