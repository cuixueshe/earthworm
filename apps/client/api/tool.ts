import type { DailySentence } from "~/types";
import { getHttp } from "./http";

export interface DailySentenceApiResponse {
  zh: string;
  en: string;
}

export async function fetchDailySentence() {
  const http = getHttp();
  return (await http<DailySentenceApiResponse>("/tool/dailySentence", {
    method: "get",
  })) as DailySentence;
}
