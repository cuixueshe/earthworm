import { watchEffect } from "vue";
import { useCourseStore } from "~/store/course";
import { play, updateSource } from "./audio";
const PRONUNCIATION = "pronunciationType";


function getPronunciationType(){
  let pronunciationTypeStringify = localStorage.getItem(PRONUNCIATION);
  return pronunciationTypeStringify;
}

let prevWord = "";
export function useCurrentStatementEnglishSound() {
  const courseStore = useCourseStore();
  let soundType = getPronunciationType();
  let param =  soundType === 'American' ? `type=0` : `type=1`;
  watchEffect(() => {
    const word = courseStore.currentStatement?.english;
    if (prevWord !== word) {
      /**
       * 美式发音： http://dict.youdao.com/dictvoice?type=0&audio=
       * 英式发音：http://dict.youdao.com/dictvoice?type=1&audio=
       */
      
      let requestUrl = `https://dict.youdao.com/dictvoice?audio=${word}&${param}`

      updateSource(requestUrl);
    }
    prevWord = courseStore.currentStatement?.english!
  });

  return {
    playSound: () => {
      play();
    },
  };
}

// 朗读每日一句
export function readOneSentencePerDayAloud(str: string) {
  let soundType = getPronunciationType();
  let param =  soundType === 'American' ? `type=0` : `type=1`;
  let requestUrl = `https://dict.youdao.com/dictvoice?audio=${str}&${param}`
  updateSource(requestUrl);
  play();
}

export function reset() {
  prevWord = "";
}

