import { http } from "./http";

interface DailySentenceVo {
  zh: string
  en: string
}

export async function fetchDailySentence() {
  return await http.get<DailySentenceVo, DailySentenceVo>("/tool/dailySentence");  
}
