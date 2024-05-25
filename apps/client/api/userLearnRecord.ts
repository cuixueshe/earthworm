import { http } from "./http";

interface UserLearnRecord {
  startDate?: string;
  endDate?: string;
}

export interface UserLearnRecordResponse {
  totalCount: number;
  list: Array<{ day: string; count: number }>;
}

export async function fetchLearnRecord(params: UserLearnRecord & { userId: string }) {
  return await http.get<unknown, UserLearnRecordResponse>(`/user-learn-record/finishCount`, {
    params,
  });
}
