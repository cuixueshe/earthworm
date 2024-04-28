import { http } from "./http";

export type RankingSelfResponse = {
  username: string;
  count: number;
  rank: number;
};

export type RankingItemResponse = {
  username: string;
  count: number;
};

export interface ProgressRankResponse {
  list: RankingItemResponse[];
  self: RankingSelfResponse | null;
  period: string;
}

export async function fetchProgressRank(period: string = "weekly") {
  return await http.get<ProgressRankResponse, ProgressRankResponse>(`/rank/progress/${period}`);
}
