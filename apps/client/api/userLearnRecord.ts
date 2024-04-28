import { http } from "./http";

interface UserLearnRecord {
  startDate?: string;
  endDate?: string;
}

interface UserLearnRecordResponse {
  totalCount: number;
  list: Array<{ day: string; count: number }>;
}

export async function fetchLearnRecord(params: UserLearnRecord) {
  return await http.get<UserLearnRecordResponse, UserLearnRecordResponse>(
    `/user-learn-record/finishCount`,
    {
      params,
    },
  );
}
