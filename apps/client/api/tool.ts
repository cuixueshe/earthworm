import { http } from "./http";

interface DailySentenceResponse {
  zh: string;
  en: string;
}

interface Word {
  us: string;
  uk: string;
}

export async function fetchDailySentence() {
  return await http.get<DailySentenceResponse, DailySentenceResponse>("/tool/dailySentence");
}

export async function fetchPhonetics(word: string) {
  return await http.get<Word, Word>("/tool/phonetics", {
    params: {
      word,
    },
  });
}
