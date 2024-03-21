import { watchEffect } from "vue";
import { useAnswerMode } from "~/composables/user/answerMode";
import { useCourseStore } from "~/store/course";
import { play, updateSource } from "./audio";

let prevWord = "";
export function useCurrentStatementEnglishSound() {
  const courseStore = useCourseStore();

  watchEffect(() => {
    const word = courseStore.currentStatement?.english;
    if (prevWord !== word) {
      updateSource(`https://dict.youdao.com/dictvoice?audio=${word}&type=1`);
    }
    prevWord = courseStore.currentStatement?.english!;
  });

  const { audioRate, audioTimes } = useAnswerMode();
  return {
    playSound: (isQuestion?: boolean) => {
      if (isQuestion) {
        play(Number(audioTimes.value), Number(audioRate.value));
      } else {
        play();
      }
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
