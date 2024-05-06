import { ref } from "vue";

import { fetchPhonetics } from "~/api/tool";

/**
 * 有道 Web 发音 API 接口
 *
 * 美式发音：https://dict.youdao.com/dictvoice?type=2&audio=word
 * 英式发音：https://dict.youdao.com/dictvoice?type=1&audio=word
 */

export enum PronunciationType {
  American = "American",
  British = "British",
}

export const pronunciationLabels: { [key in PronunciationType]: string } = {
  [PronunciationType.American]: "美音",
  [PronunciationType.British]: "英音",
};

const PRONUNCIATION_TYPE = "pronunciationType";
const pronunciation = ref<PronunciationType>(PronunciationType.American); // 默认美音

export function usePronunciation() {
  loadCache();

  function loadCache() {
    const type = getStore() || pronunciation.value;
    setStore(type);
  }

  function setStore(value: PronunciationType) {
    pronunciation.value = value;
    localStorage.setItem(PRONUNCIATION_TYPE, value);
  }

  function getStore(): PronunciationType {
    return localStorage.getItem(PRONUNCIATION_TYPE) as PronunciationType;
  }

  function getPronunciationType(): number {
    return pronunciation.value === PronunciationType.American ? 2 : 1;
  }

  function getPronunciationOptions() {
    return Object.entries(pronunciationLabels).map(([key, value]) => {
      return {
        label: value,
        value: key,
      };
    });
  }

  function getPronunciationUrl(english: string | undefined): string {
    return `https://dict.youdao.com/dictvoice?type=${getPronunciationType()}&audio=${english}`;
  }

  async function getPhonetics(word: string) {
    const response = await fetchPhonetics(word);
    let result = response[pronunciation.value];
    result = result.split("; ")[0];
    result = result.replace(/[\(\)]/g, "");
    result = `/${result}/`;
    return result;
  }

  // 切换发音
  function togglePronunciation(type: PronunciationType) {
    if (type !== pronunciation.value) setStore(type);
  }

  return {
    pronunciation,
    getPronunciationOptions,
    getPronunciationUrl,
    togglePronunciation,
    getPhonetics,
  };
}
