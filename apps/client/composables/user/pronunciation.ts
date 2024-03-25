import { ref } from "vue";

/**
 * 有道 Web 翻译 API 接口
 *
 * 美式发音：https://dict.youdao.com/dictvoice?type=0&audio=word
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
    return pronunciation.value === PronunciationType.American ? 0 : 1;
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

  // 切换发音
  function togglePronunciation(e: Event) {
    const selectedValue = (e.target as HTMLSelectElement).value;
    setStore(<PronunciationType>selectedValue);
  }

  loadCache();

  return {
    pronunciation,
    getPronunciationOptions,
    getPronunciationUrl,
    togglePronunciation,
  };
}
