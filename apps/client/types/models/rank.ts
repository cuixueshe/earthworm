import type {
  ProgressRankApiResponse,
  RankingItemApiResponse,
  RankingSelfApiResponse,
} from "~/api/rank";

export interface RankingSelf extends RankingSelfApiResponse {}

export interface RankingItem extends RankingItemApiResponse {}

export interface ProgressRank extends ProgressRankApiResponse {
  list: RankingItem[];
  self: RankingSelf | null;
}
