import { useCourseStore } from "~/store/course";
import { updateSource, play } from "./audio";
import { watchEffect } from "vue";

let prevWord = "";
export function useCurrentStatementEnglishSound() {
  const courseStore = useCourseStore();

  watchEffect(() => {
    const word = courseStore.currentStatement?.english;
    if (prevWord !== word) {
      updateSource(`https://dict.youdao.com/dictvoice?audio=${word}&type=1`);
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
  updateSource(`https://dict.youdao.com/dictvoice?audio=${str}&type=1`);
  play();
}

export function reset() {
  prevWord = "";
}
