import type { ProgressRank } from "~/types/models/rank";
import { getHttp } from "./http";

export type RankingSelfApiResponse = {
  username: string;
  count: number;
  rank: number;
};

export type RankingItemApiResponse = {
  username: string;
  count: number;
};

export interface ProgressRankApiResponse {
  list: RankingItemApiResponse[];
  self: RankingSelfApiResponse | null;
  period: string;
}

export async function fetchProgressRank(period: string = "weekly") {
  const http = getHttp();
  return (await http<ProgressRankApiResponse>(`/rank/progress/${period}`, {
    method: "get",
  })) as ProgressRank;
}
