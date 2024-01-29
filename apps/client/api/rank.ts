import { http } from "./http";

export interface ProgressRankVo {
  list: Array<{ username: string; count: number }>;
  self: null | { username: string; count: number; rank: number | null };
}

export async function fetchProgressRank() {
  return await http.get<ProgressRankVo, ProgressRankVo>("/rank/progress");
}
