import { http } from "./http";

export type RankingSelfType = {
  nickname: string;
  count: number;
  rank: number;
};

export type RankingItemType = {
  nickname: string;
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
