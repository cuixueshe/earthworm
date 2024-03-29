import { http } from "./http";

export type RankingSelfType = {
  username: string;
  count: number;
  rank: number;
};

export type RankingItemType = {
  username: string;
  count: number;
};

export interface ProgressRankVo {
  list: RankingItemType[];
  self: RankingSelfType | null;
  period: string;
}

export async function fetchProgressRank(period: string = "weekly") {
  return await http.get<ProgressRankVo, ProgressRankVo>(
    `/rank/progress/${period}`
  );
}
