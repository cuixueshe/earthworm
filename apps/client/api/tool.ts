import { http } from "./http";

interface DailySentenceResponse {
  zh: string;
  en: string;
}

export async function fetchDailySentence() {
  return await http.get<DailySentenceResponse, DailySentenceResponse>("/tool/dailySentence");
}
