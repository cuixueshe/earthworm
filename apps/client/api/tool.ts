import { http } from "./http";

interface DailySentenceVo {
  zh: string
  en: string
}

export async function fetchDailySentence() {
  return await http.get<DailySentenceVo, DailySentenceVo>("/tool/dailySentence");  
}


export const fontEn = fetch(new URL('~/assets/fonts/EBGaramond-BoldItalic.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

export const fontZh = fetch(new URL('~/assets/fonts/nzgrKangxi.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
)
